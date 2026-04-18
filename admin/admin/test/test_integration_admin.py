import time, re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "https://admin.yancarz.com"

def test_integration():
    driver = webdriver.Chrome()
    driver.maximize_window()
    wait = WebDriverWait(driver, 20)
    print("\n=== [INT] AUDIT COHÉRENCE DES DONNÉES ===")

    try:
        driver.get(f"{BASE_URL}/login")
        
        # UTILISATION DES SÉLECTEURS QUI MARCHENT DANS L'UNITAIRE
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='email']"))).send_keys("admin@example.com")
        driver.find_element(By.CSS_SELECTOR, "input[type='password']").send_keys("password123")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

        # Dashboard KPI
        wait.until(EC.url_contains("/dashboard"))
        print("📊 Dashboard chargé. Analyse du KPI...")
        time.sleep(3) # Attente du chargement des données API
        
        kpi_xpath = "//*[contains(text(), 'Total Agencies')]/following-sibling::p"
        kpi_text = wait.until(EC.visibility_of_element_located((By.XPATH, kpi_xpath))).text
        kpi_val = int(re.sub(r'\D', '', kpi_text))
        
        # Liste réelle
        driver.get(f"{BASE_URL}/agencies")
        wait.until(EC.presence_of_element_located((By.TAG_NAME, "table")))
        time.sleep(2)
        real_count = len(driver.find_elements(By.CSS_SELECTOR, "table tbody tr"))

        print(f"\nRésultat : Dashboard({kpi_val}) vs Liste({real_count})")
        if kpi_val != real_count:
            print("❌ BUG LOGIQUE : Désynchronisation détectée (Bug 4 vs 5) !")
        else:
            print("✅ OK : Données parfaitement synchronisées.")

    except Exception as e:
        print(f"❌ ERREUR SCRIPT : {e}")
    finally:
        driver.quit()

if __name__ == "__main__": test_integration()