# ReScan
ReScan is a hybrid desktop application allowing soldiers to quickly conduct and output formatted military supply inventories with the use of a barcode scanner, saving hundreds of man-hours. Manual inventory input is possible if no barcode scanner is available.  

ReScan is compiled using [Electron](https://www.electronjs.org/)
  
## Enabling Production Mode
The app is built for development by default. To build for production do the following.
1. Create a `.env` file at the project root
2. Write `PRODUCTION=true` in that file

## Database Setup
An NSN database is required for the app to function but cannot be uploaded using git due to file size limitations. The databases are utilized by the `data/decomp.exe` utility tool which is executed by the main program.

These databases can be obtained from a PubLog

### Setting up the databases
1. Go to https://www.dla.mil/HQ/InformationOperations/LogisticsInformationServices/FOIAReading/ and download `PUBLOG.zip`
2. Unzip it and copy the following files from PubLog
   * `IMD.LST`
   * `P_FLIS_NSN.TAB`
3. Paste those files into the project folder `data/tables` _Note that the `data/tables` folder may not exist and you will have to create it_
4. In case you're curious, one of the HTML instructions files inside `PUBLOG.zip` contains information on `decomp.exe`
5. `decomp.exe` has an SQL interface but it is not full sql. It's limited to a very specific subset of SQL commands and arguments

## Building The Project
1. Enable production mode if you want, otherwise, the app will be built for development by default
2. Setup the database
3. Run `npm run build:renderer`
4. Run `npm run make`
5. The `make` process may take some time. Be patient
6. The built project is created inside a new folder called `out`

## Barcode Scanner Input
Barcode scanner input is detected through a series of rapid key stroke inputs. Barcodes that rely on custom communication protocols will not function with ReScan.
