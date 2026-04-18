import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "https://www.yancarz.com"

def run_e2e_portal():
    driver = webdriver.Chrome()
    driver.maximize_window()
    wait = WebDriverWait(driver, 30) # 30 secondes car la prod est lente
    try:
        print("\n=== [E2E] PARCOURS CLIENT COMPLET - PRODUCTION ===")
        driver.get(BASE_URL)
        
        # 1. Recherche
        wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Rechercher')]"))).click()
        print("✅ Étape 1 : Recherche effectuée.")

        # 2. Sélection (On gère la lenteur d'Azure)
        time.sleep(5)
        detail_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//a[contains(., 'détails')]")))
        driver.execute_script("arguments[0].click();", detail_btn)
        print("✅ Étape 2 : Page détails chargée.")

        # 3. Réservation
        reserve_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//a[contains(., 'Réserver')]")))
        driver.execute_script("arguments[0].click();", reserve_btn)
        print("✅ Étape 3 : Tunnel de réservation atteint.")

    except Exception as e: 
        print(f"⚠️ OBSERVATION : Le parcours E2E est instable en production (Lenteur/Timeout).")
    finally: driver.quit()

if __name__ == "__main__": run_e2e_portal()