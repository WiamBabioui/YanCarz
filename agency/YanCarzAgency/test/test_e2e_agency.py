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
    wait = WebDriverWait(driver, 20)
    
    try:
        print("\n=== [E2E] PARCOURS COMPLET & LOGOUT ===")
        driver.get(f"{BASE_URL}/login")
        
        # 1. Login
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='email']"))).send_keys(EMAIL)
        driver.find_element(By.CSS_SELECTOR, "input[type='password']").send_keys(PASSWORD)
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        
        # 2. Navigation (Validée par ton dernier test !)
        for route in ["/dashboard", "/vehicles", "/clients"]:
            wait.until(EC.url_contains(route))
            print(f"✅ Route {route} : Chargée")
            driver.get(f"{BASE_URL}{route}") # On force la navigation suivante

        # 3. Logout (Correction du sélecteur)
        print("⏳ Tentative de déconnexion...")
        driver.get(f"{BASE_URL}/dashboard")
        time.sleep(2)
        
        # On cherche soit un bouton profil, soit le mot Logout directement
        try:
            logout_btn = driver.find_element(By.XPATH, "//*[contains(text(), 'Logout')] | //*[contains(text(), 'Déconnexion')]")
            driver.execute_script("arguments[0].click();", logout_btn)
        except:
            # On clique sur l'avatar (souvent la seule image dans le header)
            avatar = driver.find_element(By.XPATH, "//img[contains(@class, 'avatar')] | //button[contains(@class, 'user')]")
            avatar.click()
            time.sleep(1)
            logout_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//*[contains(text(), 'Logout')]")))
            logout_btn.click()
            
        wait.until(EC.url_contains("/login"))
        print("✅ E2E RÉUSSI : Session terminée proprement.")

    except Exception as e:
        print(f"⚠️ Erreur E2E : {e}")
    finally:
        driver.quit()

if __name__ == "__main__": run_test()