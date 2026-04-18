import time
import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "https://admin.yancarz.com"
EMAIL = "admin@example.com"
PASSWORD = "password123"

def run_bug_hunt():
    driver = webdriver.Chrome()
    driver.maximize_window()
    wait = WebDriverWait(driver, 20)
    
    try:
        print("\n" + "!"*40)
        print("🚀 SCANNER DE PRODUCTION : DÉTECTION DE FAILLES")
        print("!"*40)

        # --- CONNEXION ---
        driver.get(f"{BASE_URL}/login")
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='email']"))).send_keys(EMAIL)
        driver.find_element(By.CSS_SELECTOR, "input[type='password']").send_keys(PASSWORD)
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        
        # --- ANALYSE DYNAMIQUE DU DASHBOARD ---
        wait.until(EC.url_contains("/dashboard"))
        print("⏳ Analyse du rendu asynchrone (Dashboard)...")
        time.sleep(7) # On laisse le temps à l'API de répondre

        # STRATÉGIE "BRUTE FORCE" POUR LE KPI
        print("🔍 Recherche du KPI via analyse sémantique...")
        
        # On cherche tous les éléments qui contiennent 'Agenc' (insensible à la casse)
        # translate() permet de transformer les majuscules en minuscules pour la recherche
        xpath_kpi = "//*[contains(translate(., 'AGENCY', 'agency'), 'agenc')]"
        elements = driver.find_elements(By.XPATH, xpath_kpi)
        
        kpi_val = None
        for el in elements:
            text = el.text
            # On cherche un chiffre dans le texte de l'élément ou de son parent
            numbers = re.findall(r'\d+', text)
            if numbers:
                kpi_val = int(numbers[0])
                print(f"✅ Indicateur trouvé : '{text}' -> Valeur extraite : {kpi_val}")
                break
        
        if kpi_val is None:
            print("❌ BUG CRITIQUE : L'indicateur de performance (KPI) est absent du Dashboard !")
            print("   -> L'administrateur ne peut pas piloter son activité.")
            driver.save_screenshot("kpi_missing_error.png")
        else:
            # --- BUG 2 : COMPARAISON RÉELLE ---
            print("\n📂 Navigation vers /agencies pour vérification croisée...")
            driver.get(f"{BASE_URL}/agencies")
            wait.until(EC.presence_of_element_located((By.TAG_NAME, "table")))
            time.sleep(3)
            real_count = len(driver.find_elements(By.CSS_SELECTOR, "table tbody tr"))

            if kpi_val != real_count:
                print(f"❌ BUG LOGIQUE DÉTECTÉ : Dashboard ({kpi_val}) != Liste Réelle ({real_count})")
            else:
                print(f"✅ Synchronisation OK ({real_count} agences).")

    except Exception as e:
        print(f"⚠️ Erreur système : {e}")
        driver.save_screenshot("system_crash.png")
    finally:
        driver.quit()

if __name__ == "__main__":
    run_bug_hunt()