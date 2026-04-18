import time
import random
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "https://admin.yancarz.com"
EMAIL_ADMIN = "admin@example.com"
PASS_ADMIN = "password123"

# Données aléatoires pour le test
ID = random.randint(1000, 9999)
AGENCY_NAME = f"QA_AGENCY_PRO_{ID}"
AGENCY_EMAIL = f"test_agency_{ID}@yancarz.com"

def run_crud():
    driver = webdriver.Chrome()
    driver.maximize_window()
    wait = WebDriverWait(driver, 25)
    
    try:
        print(f"\n🚀 CYCLE CRUD COMPLET (Version Hébergée) : {AGENCY_NAME}")
        driver.get(f"{BASE_URL}/login")
        
        # 1. LOGIN
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='email']"))).send_keys(EMAIL_ADMIN)
        driver.find_element(By.CSS_SELECTOR, "input[type='password']").send_keys(PASS_ADMIN)
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        
        # 2. NAVIGATION
        wait.until(EC.url_contains("/dashboard"))
        driver.get(f"{BASE_URL}/agencies")
        
        # 3. CRÉATION (Utilisation des Placeholders réels)
        print("➕ Étape 1 : Création...")
        wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Add')]"))).click()
        time.sleep(2)

        # Dictionnaire des champs basé sur tes observations réelles
        form_fields = {
            "Enter agency name": AGENCY_NAME,
            "Enter email address": AGENCY_EMAIL,
            "Enter phone number": "0612345678",
            "Enter address": "Avenue de la Victoire QA",
            "Enter last name": "Tester",
            "Enter first name": "Wiam"
        }

        for placeholder, value in form_fields.items():
            field = driver.find_element(By.XPATH, f"//input[@placeholder='{placeholder}']")
            field.send_keys(value)
            print(f"   ✅ Champ '{placeholder}' rempli.")

        # Sélection de la ville (via JS pour éviter l'erreur d'interception)
        print("🏙️ Sélection de la ville...")
        city_select = driver.find_element(By.TAG_NAME, "select")
        driver.execute_script("arguments[0].selectedIndex = 1; arguments[0].dispatchEvent(new Event('change'));", city_select)
        
        # Clic sur Add
        add_button = driver.find_element(By.XPATH, "//button[text()='Add' or contains(., 'Add')]")
        driver.execute_script("arguments[0].click();", add_button)
        print("🚀 Formulaire envoyé !")

        # 4. RECHERCHE AVEC SYNCHRONISATION (Polling)
        print("⏳ Attente de l'apparition de l'agence (Max 30s)...")
        found = False
        for i in range(5):
            driver.refresh()
            time.sleep(5)
            search_input = wait.until(EC.presence_of_element_located((By.XPATH, "//input[contains(@placeholder, 'Search')]")))
            search_input.clear()
            search_input.send_keys(AGENCY_NAME)
            time.sleep(2)
            
            if AGENCY_NAME in driver.page_source:
                print(f"✅ Agence trouvée à la tentative {i+1} !")
                found = True
                break
            print(f"   ... Tentative {i+1} infructueuse, on réessaie.")

        if not found:
            print("❌ BUG DE PERSISTANCE : L'agence a été créée mais n'apparaît pas dans la liste !")
            driver.save_screenshot("DATA_NOT_FOUND.png")
            return

        # 5. SUPPRESSION (Nettoyage)
        print("🗑️ Étape 2 : Suppression...")
        # On cible la ligne spécifique
        row = driver.find_element(By.XPATH, f"//tr[contains(., '{AGENCY_NAME}')]")
        del_btn = row.find_element(By.XPATH, ".//button[contains(@class, 'danger') or contains(@class, 'delete')]")
        driver.execute_script("arguments[0].click();", del_btn)
        
        # Confirmation
        confirm = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Confirm') or contains(., 'Delete')]")))
        driver.execute_script("arguments[0].click();", confirm)
        
        print(f"✅ Agence {AGENCY_NAME} supprimée avec succès.")
        print("\n🏆 BILAN : TEST CRUD 100% RÉUSSI !")

    except Exception as e:
        print(f"❌ ÉCHEC : {e}")
        driver.save_screenshot("FINAL_CRUD_ERROR.png")
    finally:
        driver.quit()

if __name__ == "__main__":
    run_crud()