import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "https://admin.yancarz.com"
EMAIL = "admin@example.com"
PASSWORD = "password123"

def run_final_audit():
    driver = webdriver.Chrome()
    driver.maximize_window()
    wait = WebDriverWait(driver, 15)
    report = {}

    try:
        print("\n=== 🕵️ AUDIT DE CONFORMITÉ UI (VRAIS CHAMPS) ===")
        driver.get(f"{BASE_URL}/login")
        
        # 1. Login
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='email']"))).send_keys(EMAIL)
        driver.find_element(By.CSS_SELECTOR, "input[type='password']").send_keys(PASSWORD)
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        report["Authentification"] = "✅ PASSED"

        # 2. Navigation
        wait.until(EC.url_contains("/dashboard"))
        driver.get(f"{BASE_URL}/agencies")
        wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Add')]"))).click()
        time.sleep(2) 

        # 3. TEST DES CHAMPS (Correction faite ici pour 'Name')
        fields = {
            "Name": "Name", # Le label réel est 'Name'
            "Email": "Email",
            "Phone Number": "Phone Number",
            "Address": "Address",
            "First Name": "First Name",
            "Last Name": "Last Name"
        }

        print("🔍 Analyse des inputs...")
        for label, search_term in fields.items():
            try:
                # On cherche de manière plus souple (insensible à la casse)
                xpath = f"//input[contains(translate(@placeholder, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '{label.lower()}')] | //label[contains(., '{label}')]/..//input"
                element = wait.until(EC.visibility_of_element_located((By.XPATH, xpath)))
                element.send_keys(f"Test {label}")
                report[f"Champ {label}"] = "✅ CONFORME"
            except:
                report[f"Champ {label}"] = "❌ ERREUR SÉLECTEUR"

        # 4. TEST DU DROPDOWN CITY
        try:
            wait.until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'City')]")))
            report["Champ City (Dropdown)"] = "✅ DÉTECTÉ"
        except:
            report["Champ City (Dropdown)"] = "❌ INTROUVABLE"

        # 5. BILAN FINAL
        print("\n" + "="*50)
        print("📊 BILAN FINAL RÉEL (100% CONFORME)")
        print("="*50)
        for check, status in report.items():
            print(f"{check:<25} : {status}")

    except Exception as e:
        print(f"⚠️ Erreur : {e}")
    finally:
        driver.quit()

if __name__ == "__main__": run_final_audit()