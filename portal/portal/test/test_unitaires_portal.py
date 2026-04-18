import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "https://www.yancarz.com"

def run_unit_portal():
    driver = webdriver.Chrome()
    wait = WebDriverWait(driver, 20)
    try:
        print("\n=== [UNITAIRE] VALIDATION UI - PORTAL PRODUCTION ===")
        driver.get(BASE_URL)
        driver.maximize_window()

        # 1. Vérifier le Logo
        logo = wait.until(EC.presence_of_element_located((By.XPATH, "//h2[text()='YanCarz']")))
        print("✅ Unitaire : Logo YanCarz présent.")

        # 2. Vérifier les icônes Material Symbols
        icons = driver.find_elements(By.CLASS_NAME, "material-symbols-outlined")
        assert len(icons) > 0
        print(f"✅ Unitaire : {len(icons)} icônes Material Symbols détectées.")

        # 3. Vérifier les labels de navigation
        nav_links = ["Accueil", "Réserver", "Agences"]
        for link in nav_links:
            assert link in driver.page_source
        print("✅ Unitaire : Menu de navigation conforme.")

    except Exception as e: print(f"❌ ÉCHEC UNITAIRE : {e}")
    finally: driver.quit()

if __name__ == "__main__": run_unit_portal()