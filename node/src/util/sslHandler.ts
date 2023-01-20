import * as fs from 'fs';

export async function getSslInfo(): Promise<string[]> {
  return Promise.all([
    await readFile(`../tls/${process.env.TLS_KEY_FILE ? process.env.TLS_KEY_FILE : 'certificate.key'}`),
    await readFile(`../tls/${process.env.TLS_CERT_FILE ? process.env.TLS_CERT_FILE : 'certificate.crt'}`),
    await readFile(`../tls/${process.env.TLS_CA_FILE ? process.env.TLS_CA_FILE : 'certificate.chain'}`)
  ]).then(sslInfo => {
    return sslInfo;
  });
}


/**
 * Checks to make sure the certificate files exist or throw a warning
 * @param sslInfo String array of the tls certificates
 */
export function certificatesExists(sslInfo: string[]) {
  let arrayLength: number = sslInfo.length;

  for (var i = 0; i < arrayLength; i++) {
    // If any certificate is missing throw an error
    if (sslInfo[i].length === 0) {
      console.error("Missing or incorrectly configured SSL certificates");
      return false;
    }
  }

  return true;
}

/**
 * Creates a promise to read a file and return either the data from the file or nothing if
 * no file is found
 * @param path the relative or absolute path to the file
 * @return the promise execution
 */
async function readFile(path: string): Promise<string> {
  return await new Promise(resolve => {
    fs.readFile(path, 'utf8', (err, data) => {
      resolve(err ? '' : data);
    });
  });
}