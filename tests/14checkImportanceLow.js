var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


var driver_fx = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();


checkImportanceLow(driver_fx);
checkImportanceLow(driver_chr);

// Show completed cards

function checkImportanceLow(driver) {
  driver.get('https://dbull7.github.io/2DoBox-pivot/');
  driver.findElement(By.id('title-input')).sendKeys('please');
  driver.findElement(By.id('body-input')).sendKeys('work');
  driver.findElement(By.id('save-button')).click();

  driver.findElement(By.className('downvote')).click();

  driver.findElement(By.id('title-input')).sendKeys('will');
  driver.findElement(By.id('body-input')).sendKeys('work');
  driver.findElement(By.id('save-button')).click();


  driver.sleep(3000).then(function() {
    driver.findElement(By.id('importance-low')).click()
    driver.findElement(By.className('card-title')).getText().then(function(Low) {
      if(Low === 'please') {
        console.log('Test passed');
      } else {
        console.log('Test failed');
      }
    });
  });
  driver.sleep(2000).then(function() {
    driver.quit();
  })

}
