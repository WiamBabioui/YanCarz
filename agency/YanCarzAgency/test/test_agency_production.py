import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "https://myagency.yancarz.com"
# --- VÉRIFIEZ BIEN CES INFOS ---
EMAIL = "agency@example.com" 
PASSWORD = "password123"

def run_agency_audit():
    options = webdriver.ChromeOptions()
    # On ajoute un "User-Agent" pour ressembler à un vrai humain
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36")
    
    driver = webdriver.Chrome(options=options)
    driver.maximize_window()
    wait = WebDriverWait(driver, 15)
    
    try:
        print("\n=== 🛡️ DIAGNOSTIC PRODUCTION : AGENCY APP ===")
        driver.get(f"{BASE_URL}/login")
        
        # 1. Login
        print("🔑 Saisie des identifiants...")
        email_input = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[type='email']")))
        email_input.send_keys(EMAIL)
        driver.find_element(By.CSS_SELECTOR, "input[type='password']").send_keys(PASSWORD)
        
        print("🖱️ Clic sur le bouton de connexion...")
        login_btn = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        driver.execute_script("arguments[0].click();", login_btn)
        
        # 2. ANALYSE POST-CLIC (Le moment critique)
        time.sleep(5) # On laisse 5 sec pour voir la réaction
        
        current_url = driver.current_url
        print(f"📍 URL après tentative : {current_url}")
        
        if "login" in current_url:
            print("❌ ÉCHEC : Nous sommes toujours sur la page de Login.")
            # On cherche un message d'erreur sur la page
            try:
                error_msg = driver.find_element(By.XPATH, "//*[contains(@class, 'error') or contains(@class, 'red') or contains(text(), 'invalid')]").text
                print(f"🚩 Message d'erreur détecté : {error_msg}")
            except:
                print("🚩 Aucun message d'erreur visible, le bouton semble inactif.")
        else:
            print("✅ SUCCÈS : Connexion réussie, redirection vers le Dashboard !")
            
            # 3. TEST DU PRIX NÉGATIF (Uniquement si connecté)
            print("🔍 Test du bug 'Prix Négatif' sur /vehicles/add...")
            driver.get(f"{BASE_URL}/vehicles/add")
            
            # Attente du champ prix par son nom exact (à vérifier dans l'inspecteur)
            price_field = wait.until(EC.presence_of_element_located((By.NAME, "daily_price")))
            price_field.send_keys("-500")
            driver.find_element(By.XPATH, "//button[@type='submit']").click()
            
            time.sleep(3)
            if "add" not in driver.current_url:
                print("❌ BUG CONFIRMÉ : Le serveur a accepté -500 MAD !")
            else:
                print("✅ OK : La validation bloque le prix négatif.")

    except Exception as e:
        print(f"⚠️ Erreur technique : {e}")
        driver.save_screenshot("DEBUG_FINAL.png")
    
    finally:
        driver.quit()

if __name__ == "__main__":
    run_agency_audit()