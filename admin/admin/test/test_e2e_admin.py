import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "https://admin.yancarz.com"

def test_e2e():
    driver = webdriver.Chrome()
    driver.maximize_window()
    wait = WebDriverWait(driver, 20)
    print("\n=== [E2E] PARCOURS COMPLET & SÉCURITÉ ===")

    try:
        driver.get(f"{BASE_URL}/login")
        
        # LOGIN SÉCURISÉ
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='email']"))).send_keys("admin@example.com")
        driver.find_element(By.CSS_SELECTOR, "input[type='password']").send_keys("password123")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        
        wait.until(EC.url_contains("/dashboard"))
        print("✅ Connexion réussie.")

        # Test de navigation vers les nouvelles pages
        for route in ["/analytics", "/user", "/countries"]:
            driver.get(f"{BASE_URL}{route}")
            wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
            print(f"✅ Route {route} : Accessible")

        # LOGOUT (Via JavaScript pour plus de fiabilité)
        print("⏳ Tentative de déconnexion...")
        driver.get(f"{BASE_URL}/dashboard")
        try:
            # On cherche n'importe quel élément contenant "Logout"
            logout_btn = wait.until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Logout')]")))
            driver.execute_script("arguments[0].click();", logout_btn)
            
            wait.until(EC.url_contains("/login"))
            print("✅ Redirection vers Login : OK")
            
            # Vérification LocalStorage
            is_logged = driver.execute_script("return localStorage.getItem('isLoggedIn');")
            if is_logged == "true":
                print("❌ BUG SÉCURITÉ : LocalStorage non vidé !")
            else:
                print("✅ SÉCURITÉ : Session détruite proprement.")
        except:
            print("❌ BUG : Impossible d'effectuer le Logout.")

    except Exception as e:
        print(f"❌ ÉCHEC DU TEST : {e}")
    finally:
        driver.quit()

if __name__ == "__main__": test_e2e()