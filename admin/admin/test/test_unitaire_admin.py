import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "https://admin.yancarz.com"

def test_unitaire():
    driver = webdriver.Chrome()
    driver.maximize_window()
    wait = WebDriverWait(driver, 15)
    print("\n=== [UNIT] AUDIT DES COMPOSANTS UI ===")
    
    try:
        driver.get(f"{BASE_URL}/login")
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='email']"))).send_keys("admin@example.com")
        driver.find_element(By.CSS_SELECTOR, "input[type='password']").send_keys("password123")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        
        wait.until(EC.presence_of_element_located((By.TAG_NAME, "aside")))
        menus = ["Countries", "Cities", "Devises", "Marke", "Model", "User", "Zone-geography"]
        
        missing_menus = []
        for menu in menus:
            try:
                wait.until(EC.presence_of_element_located((By.XPATH, f"//*[contains(text(), '{menu}')]")))
                print(f"✅ Menu '{menu}' : OK")
            except:
                missing_menus.append(menu)
                print(f"❌ BUG : Menu '{menu}' MANQUANT")

        print("\n" + "="*30)
        print(f"RAPPORT UNITAIRE : {len(missing_menus)} erreur(s) trouvée(s).")
        print("="*30)

    finally:
        driver.quit()

if __name__ == "__main__": test_unitaire()