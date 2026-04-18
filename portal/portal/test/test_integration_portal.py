import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "https://www.yancarz.com"

def run_integration_portal():
    driver = webdriver.Chrome()
    wait = WebDriverWait(driver, 20)
    try:
        print("\n=== [INTÉGRATION] CHASSE AUX BUGS - PORTAL PRODUCTION ===")
        
        # --- TEST BUG 1 : LOGIQUE FINANCIÈRE (0 MAD) ---
        print("\n[TEST 1] Vérification du tarif 0 MAD...")
        driver.get(BASE_URL)
        from_date = wait.until(EC.presence_of_element_located((By.NAME, "from")))
        to_date = driver.find_element(By.NAME, "to")
        # On injecte la même date
        today = "2026-03-18" 
        driver.execute_script(f"arguments[0].value = '{today}';", from_date)
        driver.execute_script(f"arguments[0].value = '{today}';", to_date)
        driver.find_element(By.XPATH, "//button[contains(., 'Rechercher')]").click()
        time.sleep(4)
        if "0 MAD" in driver.page_source:
            print("❌ BUG DÉTECTÉ : Le système accepte les locations gratuites (0 MAD) !")
        else:
            print("✅ OK : Tarif minimum appliqué.")

        # --- TEST BUG 2 : ROUTAGE SERVEUR (404) ---
        print("\n[TEST 2] Test des liens directs (Deep Linking)...")
        driver.get(f"{BASE_URL}/search")
        time.sleep(2)
        if "404" in driver.title or "introuvable" in driver.page_source:
            print("❌ BUG DÉTECTÉ : Erreur 404 sur accès direct (Routing cassé) !")
        else:
            print("✅ OK : Le serveur gère les routes React.")

    except Exception as e: print(f"❌ ERREUR SCRIPT : {e}")
    finally: driver.quit()

if __name__ == "__main__": run_integration_portal()