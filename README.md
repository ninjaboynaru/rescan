# ReScan

## EnvVaribales
Define environment variables in a `.env` file.

## Database Setup
An NSN database is required for the app to function but can not be uploaded using git due to file size limitations. The databses are utilized by the `data/decomp.exe` utility tool which is executed by the main program.

These databases can be optained from a PubLog

### Seting up the databases
1. Go to https://www.dla.mil/HQ/InformationOperations/LogisticsInformationServices/FOIAReading/ and download `PUBLOG.zip`
2. Unzip it add copy the fallowing files from PubLog
   * `IMD.LST`
   * `P_FLIS_NSN.TAB`
3. Paste those files into the project folder `data/tables` _Note that the `data/tables` folder may not exist and you will have to create it_
4. In case you're curious, one of the HTML instruction files inside `PUBLOG.zip` contains information on `decomp.exe`