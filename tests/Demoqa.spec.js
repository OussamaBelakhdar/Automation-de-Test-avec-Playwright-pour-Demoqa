import { test, expect } from '@playwright/test';

test('Text Box', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');
  
  // Vérification de l'URL de la page
  await expect(page).toHaveURL('https://demoqa.com/text-box');
  
  // Vérification du titre de la page
 // await expect(page).toHaveTitle(/.*Text Box/);

  // Remplissage du champ "Full Name"
  await page.getByPlaceholder('Full Name').click();
  await page.getByPlaceholder('Full Name').fill('Oussama');
  await expect(page.getByPlaceholder('Full Name')).toHaveValue('Oussama');

  // Remplissage du champ "Email"
  await page.getByPlaceholder('name@example.com').fill('Oussama@gmail.com');
  await expect(page.getByPlaceholder('name@example.com')).toHaveValue('Oussama@gmail.com');

  // Remplissage du champ "Current Address"
  const address = 'District Jack Street Alphered Number 4 ';
  await page.getByPlaceholder('Current Address').fill(address);
  await expect(page.getByPlaceholder('Current Address')).toHaveValue(address);

  // Remplissage du champ "Permanent Address"
  await page.locator('#permanentAddress').fill(address);
  await expect(page.locator('#permanentAddress')).toHaveValue(address);

  // Clique sur le bouton "Submit"
  await page.getByRole('button', { name: 'Submit' }).click();

  // Ajout d'une assertion pour vérifier que les données ont bien été soumises
  // (Cela dépend de la réaction attendue du site après la soumission. Par exemple, si un message de confirmation apparaît, vous pouvez ajouter une assertion pour vérifier ce message.)
  // await expect(page).toHaveText('Your data has been submitted successfully!');
});


test('Checkbox', async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');
    
      // Vérification de l'URL de la page
  await expect(page).toHaveURL('https://demoqa.com/checkbox'); 
    // Clique sur le bouton "Expand all"
    await page.getByLabel('Expand all').click();

    // Vérification que tous les éléments sont bien dépliés
    // (Cela dépend de la structure exacte du site, mais supposons qu'un élément déplié ait une classe "expanded")
    //await expect(page.locator('.expanded')).toHaveCount(4); // ou tout autre nombre d'éléments dépliés

    // Clique sur différents éléments de la liste
    const downloadsCheckbox = await page.locator('label').filter({ hasText: 'Downloads' }).getByRole('img').first();
    await downloadsCheckbox.click();
    //await expect(downloadsCheckbox).toHaveAttribute('checked', 'true');

    const officeCheckbox = await page.locator('label').filter({ hasText: 'Office' }).getByRole('img').first();
    await officeCheckbox.click();
    //await expect(officeCheckbox).toHaveAttribute('checked', 'true');

    const workSpaceCheckbox = await page.locator('label').filter({ hasText: 'WorkSpace' }).getByRole('img').first();
    await workSpaceCheckbox.click();
    //await expect(workSpaceCheckbox).toHaveAttribute('checked', 'true');

    const desktopCheckbox = await page.locator('label').filter({ hasText: 'Desktop' }).getByRole('img').first();
    await desktopCheckbox.click();
    //await expect(desktopCheckbox).toHaveAttribute('checked', 'true');
});

test('Radio Button', async ({ page }) => {
    await page.goto('https://demoqa.com/radio-button');
    
    // Vérification de l'URL de la page
    await expect(page).toHaveURL('https://demoqa.com/radio-button'); 

    // Clique sur le bouton radio "Yes"
    const yesRadioButton = await page.locator('div').filter({ hasText: /^Yes$/ });
    await yesRadioButton.click();

    // Vérification que le bouton radio "Yes" est bien sélectionné
    // (Cela dépend de la structure exacte du site, mais supposons que le bouton radio sélectionné ait une classe "selected")
    //await expect(yesRadioButton).toHaveClass('custom-control-label'); 

    // Clique sur le bouton radio "Impressive"
    const impressiveRadioButton = await page.getByText('Impressive');
    await impressiveRadioButton.click();

    // Vérification que le bouton radio "Impressive" est bien sélectionné
   // await expect(impressiveRadioButton).toHaveClass('custom-control custom-radio custom-control-inline'); 
});

test('Web Tables', async ({ page }) => {
    await page.goto('https://demoqa.com/webtables');
    // Vérification de l'URL de la page
    await expect(page).toHaveURL('https://demoqa.com/webtables'); 

    await page.frameLocator('iframe[name="google_ads_iframe_\\/21849154601\\,22343295815\\/Ad\\.Plus-Anchor_0"]').locator('#cbb').click();
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByPlaceholder('First Name').fill('Alex');
    await page.getByPlaceholder('Last Name').fill('marin');
    await page.getByPlaceholder('name@example.com').fill('alexmarin@gmai.com');
    await page.getByPlaceholder('Age').fill('30');
    await page.getByPlaceholder('Salary').fill('4500');
    await page.getByPlaceholder('Department').fill('IT');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByPlaceholder('Type to search').fill('Alex');
  });


  test('Upload Download', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
    // Vérification de l'URL de la page
    await expect(page).toHaveURL('https://demoqa.com/upload-download'); 
    downloadsPath: './my-downloads'
    await page.getByLabel('Select a file').click();
    await page.getByLabel('Select a file').setInputFiles('image.png');
    const downloadPromise = page.waitForEvent('download');

    await page.getByRole('link', { name: 'Download' }).click();
    const download = await downloadPromise;
    const path = await download.path();
    console.log(`File downloaded to: ${path}`);
  });
