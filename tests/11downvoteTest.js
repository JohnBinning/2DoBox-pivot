var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


var driver_fx = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();


checkDownvote(driver_fx);
checkDownvote(driver_chr);



function checkDownvote(driver) {
  driver.get('https://dbull7.github.io/2DoBox-pivot/');
  driver.findElement(By.id('title-input')).sendKeys('please');
  driver.findElement(By.id('body-input')).sendKeys('work');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.className('downvote')).click()

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('quality')).getText().then(function(quality) {
      if(quality === 'Low') {
        console.log('Test passed');
      } else {
        console.log('Test failed');
      }
    });
  });

  driver.quit();
}
