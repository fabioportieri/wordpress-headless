const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path, i change it into both to make it work on docker environment
  const targetProdPath = './src/environments/environment.prod.ts';
  const targetDevPath = './src/environments/environment.ts';
  // Load node modules
  const appVersion = require('../../package.json').version;
  require('dotenv').config({
    path: 'src/environments/.env',
  });

  const wordpressPassword = process.env.NG_WORDPRESS_SITE_PASSWORD
    ? process.env.NG_WORDPRESS_SITE_PASSWORD.trim()
    : null;
  if (!wordpressPassword)
    console.error(
      "Password for wordpress website not set as environment variable. Do a 'set WORDPRESS_SITE_PASSWORD=<password>' beforehand."
    );

  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
    wordpressSiteUrl: '${process.env.WORDPRESS_SITE_URL}',
    wordpressSitePassword: '${wordpressPassword}',
    appVersion: '${appVersion}',
    production: '${process.env.IS_PRODUCTION}',
  };
  `;
  console.log(
    'The file `environment.ts` will be written with the following content: \n',
    envConfigFile
  );
  writeFile(targetProdPath, envConfigFile, (err: any) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.ts file generated correctly at ${targetProdPath} \n`
      );
    }
  });

  writeFile(targetDevPath, envConfigFile, (err: any) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.ts file generated correctly at ${targetDevPath} \n`
      );
    }
  });
};

setEnv();
