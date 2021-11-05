DECOMP
------------------------------------------------------------
Decomp is a utility provided for extracting data via a
command line program.  The utility performs a search on a single 
table, using simple SQL.  The syntax for the program is as follows:

decomp.exe <path_to_imd.lst_folder> ["SQL statement"] [Output File]

Decomp contains one pre-defined table listing all available tables
IMD_TABLES
    TABLE_NAME
    ROWS
    PUB_DATE

AN example would be:

decomp.exe "C:\product" "select TABLE_NAME,ROWS,PUB_DATE from IMD_TABLES
        WHERE TABLE_NAME='table'

Other examples to illustrate the functionality would be:

decomp.exe "c:\product" "select field1, field2, field3 FROM table
	WHERE field1='12345'" "C:\product\output.TXT"

In the above example the "product" data has been installed to the 
"C:\product" folder, and the data to extract is field1, field2, and 
field3 from the table "table" where field1 is equal to 12345.  
When the data is extracted it is written to the file
output.txt located in the "C:\product" folder.


To extract a complete table:

decomp.exe "c:\product" "select field1, field2, field3 FROM table


To extract given a list of query items:

decomp.exe "c:\product" "select field1, field2, field3 FROM table
	WHERE field1='@queries.txt'" "C:\product\output.TXT"

In the above example, queries.txt is a text file with individual queries
one per line.

'BLANK' and 'NONBLANK' are reserved words to extract only those
fields where the data is or is not present.  An example:

decomp.exe "c:\product" "select field1, field2, field3 FROM table
	WHERE field1='BLANK'" "C:\product\output.TXT"