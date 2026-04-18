import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "https://myagency.yancarz.com"
EMAIL = "agency@example.com"
PASSWORD = "password123"

def run_test():
    driver = webdriver.Chrome()
    driver.maximize_window()
    wait = WebDriverWait(driver, 30)
    
    try:
        print("\n=== [UNIT] AUDIT INTERFACE AGENCY ===")
        driver.get(f"{BASE_URL}/login")
        
        # Login (Identique à l'E2E qui fonctionne)
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='email']"))).send_keys(EMAIL)
        driver.find_element(By.CSS_SELECTOR, "input[type='password']").send_keys(PASSWORD)
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        
        # Attente redirection
        wait.until(EC.url_contains("/dashboard"))
        print("✅ Connexion réussie.")

        # Vérification Sidebar
        menus = ["Dashboard", "Vehicles", "Clients", "Billing"]
        for m in menus:
            try:
                # On cherche le texte n'importe où
                wait.until(EC.presence_of_element_located((By.XPATH, f"//*[contains(text(), '{m}')]")))
                print(f"✅ Menu '{m}' : Détecté")
            except:
                print(f"❌ BUG : Menu '{m}' introuvable")

    except Exception as e:
        print(f"⚠️ Erreur Unitaire : {e}")
    finally:
        driver.quit()

if __name__ == "__main__": run_test()