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
    wait = WebDriverWait(driver, 25)
    
    try:
        print("\n=== [INT] AUDIT LOGIQUE PRIX NÉGATIF ===")
        driver.get(f"{BASE_URL}/login")
        
        # Login
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='email']"))).send_keys(EMAIL)
        driver.find_element(By.CSS_SELECTOR, "input[type='password']").send_keys(PASSWORD)
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        
        # Navigation forcée vers l'ajout
        wait.until(EC.url_contains("/dashboard"))
        driver.get(f"{BASE_URL}/vehicles/add")
        
        # Test Prix Négatif
        print("🧪 Injection de -500 MAD...")
        price_input = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='number'] | //input[contains(@name, 'price')]")))
        price_input.clear()
        price_input.send_keys("-500")
        
        driver.find_element(By.XPATH, "//button[@type='submit' or contains(., 'Add') or contains(., 'Save')]").click()
        
        time.sleep(4)
        if "add" not in driver.current_url.lower():
            print("❌ BUG CRITIQUE : Prix négatif accepté (Redirection effectuée) !")
        else:
            print("✅ OK : Le système a bloqué l'entrée invalide.")

    except Exception as e:
        print(f"⚠️ Erreur Intégration : {e}")
    finally:
        driver.quit()

if __name__ == "__main__": run_test()