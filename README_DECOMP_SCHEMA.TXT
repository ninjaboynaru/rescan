- PUBLOG table schema
- 
- This file can be used in conjunction with the DECOMP.EXE utility
- Each table is separated by a blank line
- The table name is followed by two spaces and then the table description and the disc #
- Fields within the table are then listed followed by their (length)
- Primary key fields used to join tables are indicated with '*'
- Indexed fields are indicated with '+'
- 
P_FLIS_NSN  FLIS NSN  Disc 1
  FSC (4) +
  NIIN (9) *+
  INC (5) +
  ITEM_NAME (32) +
  SOS (19) +
  END_ITEM_NAME (983) +
  CANCELLED_NIIN (939) +

P_PART_PICK  PART NUMBER  Disc 1
  FSC (4) +
  NIIN (9) *+
  ITEM_NAME (32) +
  CAGE_CODE (5) +
  PART_NUMBER (32) +
  COMPANY_NAME (166) +

P_CHARACTERISTICS_PICK  CHAR  Disc 1
  FSC (4) +
  NIIN (9) *+
  ITEM_NAME (1125) +
  CHARACTERISTICS (3233) +
  MEDICAL_NAME (230) +
  COMMON_NAME (725) +

P_H2_PICK  H2  Disc 1
  FSG (2) +
  FSC (4) *+
  FSG_TITLE (96) +
  FSC_TITLE (96) +

P_H3_PICK  H3  Disc 1
  DODIC (4) *+
  FSC (4) +
  DODAC (9) +
  ITEM_NAME (58) +
  INC_STATUS (1) +

P_H5_PICK  H5  Disc 1
  ASSOCIATION_CAGE (5) +
  CAGE_CODE (5) *+
  COMPANY (162) +
  CITY (34) +
  STATE (2) +
  ZIP (10) +
  PROVINCE (35) +
  POSTAL_ZONE (10) +
  COUNTRY (36) +

P_H6_PICK  H6  Disc 1
  INC (5) *+
  ITEM_NAME (196) +
  FIIG (6) +
  FIIG_4 (4) +
  FSC (89) +
  IMM (50) +

P_HISTORY_PICK  HISTORY  Disc 1
  FSC (4) +
  NIIN (9) *+
  ITEM_NAME (172) +
  INC (5) +
  SOS (35) +
  CAGE_CODE (1367) +
  PART_NUMBER (3196) +

P_CAGE  COMMERCIAL AND GOVERNMENT ENTITY (CAGE)  Disc 1
  CAGE_CODE (5) *+
  CAGE_STATUS (1) +
  TYPE (1) +
  CAO (6) +
  COMPANY (178) +
  CITY (36) +
  STATE_PROVINCE (36) +
  ZIP_POSTAL_ZONE (10) +
  COUNTRY (36) +

P_HELP  Context Sensitive Help  Disc 1
  CODE (25) *+
  LITERAL (254) 
  DESCRIPTION (2048) +
  REGS (191) 

V_FLIS_IDENTIFICATION  IDENTIFICATION  Disc 1
  NIIN (9) *+
  FIIG (6) 
  INC (5) 
  PINC (7) 
  CRIT_CD (1) 
  II (1) 
  RPD_MRC (1) 
  DMIL (1) 
  DMIL_INT_CD (1) 
  NIIN_ASGMT (11) 
  PMIC (1) 
  ADP (1) 
  ESD_EMI (1) 
  HMIC (1) 
  HCC (2) 
  SCHEDULE_B (10) 
  ENAC (8) 
  IUID_INDICATOR (1) 
  LST_KWN_SOS (3) 
  NATO_FMSN (3) 
  FEDMALL (1) 

V_FLIS_STANDARDIZATION  STANDARDIZATION  Disc 1
  NIIN (9) *+
  RELATED_NSN (13) 
  ISC (1) 
  ORIG_STDZN_DEC (2) 
  DT_STDZN_DEC (11) 
  NIIN_STAT_CD (1) 

V_FLIS_CANCELLED_NIIN  CANCELLED/REPLACED  Disc 1
  NIIN (9) *+
  CANCELLED_NIIN_FSC (4) 
  CANCELLED_NIIN (9) 
  NIIN_STAT_CD (1) 
  EFF_DATE (11) 
  DEMIL (1) 

V_FLIS_MANAGEMENT  MANAGEMENT  Disc 1
  NIIN (9) *+
  EFFECTIVE_DATE (11) 
  MOE (2) 
  AAC (1) 
  SOS (3) 
  SOSM (3) 
  UI (2) 
  UI_CONV_FAC (5) 
  UNIT_PRICE (12) 
  QUP (1) 
  CIIC (1) 
  SLC (1) 
  REP_REC_CODE (1) 
  MGMT_CTL (7) 
  REP_NET_PR (1) 
  USC (1) 

V_FLIS_MANAGEMENT_FUTURE  MANAGEMENT FUTURE  Disc 1
  NIIN (9) *+
  EFFECTIVE_DATE (11) 
  MOE (2) 
  AAC (1) 
  SOS (3) 
  UI (2) 
  UNIT_PRICE (12) 
  QUP (1) 
  CIIC (1) 
  SLC (1) 
  REP_REC_CODE (1) 
  REP_NET_PR (1) 
  USC (1) 

V_MGMT_AIR_FORCE  MGMT CONTROL AIR FORCE  Disc 1
  NIIN (9) *+
  FUND (2) 
  BUDGET (1) 
  MMAC (2) 
  PVC (1) 
  ERRC (1) 

V_MGMT_ARMY  MGMT CONTROL ARMY  Disc 1
  NIIN (9) *+
  MATCAT_1 (1) 
  MATCAT_2 (1) 
  MATCAT_3 (1) 
  MATCAT_4_5 (2) 
  ARC (1) 

V_MGMT_COAST_GUARD  MGMT CONTROL COAST GUARD  Disc 1
  NIIN (9) *+
  IAC (1) 
  SNC (1) 
  SMCC (1) 

V_MGMT_MARINE_CORPS  MGMT CONTROL MARINE CORPS  Disc 1
  NIIN (9) *+
  SAC (1) 
  CEC (1) 
  MEC (2) 
  MIC (1) 
  OTC (1) 
  PCC (1) 

V_MGMT_NAVY  MGMT CONTROL NAVY  Disc 1
  NIIN (9) *+
  COG (2) 
  SMIC (2) 
  IRRC (2) 
  SMCC (1) 

V_SOCOM_MANAGEMENT  MGMT CONTROL SOCOM  Disc 2
  NIIN (9) *+
  ICP (1) 
  A_L (1) 
  REP (1) 
  W_ESDC (2) 
  AR (1) 
  COS (1) 

V_FLIS_PHRASE  PHRASE  Disc 1
  NIIN (9) *+
  MOE (2) 
  USC (1) 
  PHRS_CD (1) 
  PHRASE_STATEMENT (49) 
  ORDER_OF_USE (3) 
  JUMP_TO_CODE (3) 
  QPA (3) 
  UM (2) 
  TECH_DOC_NBR (20) 
  QNTV_EXPRSN (13) 

V_MOE_RULE  MOE RULE CODED  Disc 1
  NIIN (9) *+
  MOE_RL (4) 
  MOE_CD (2) 
  AMC (1) 
  AMSC (1) 
  NIMSC (1) 
  DT_ASGND (9) 
  IMC (1) 
  IMCA (2) 
  AAC (1) 
  PICA (2) 
  PICA_LOA (2) 
  SICA (2) 
  SICA_LOA (2) 
  SUBMTR (2) 
  AUTH_COLLAB (14) 
  SUPP_COLLAB (26) 
  AUTH_RCVR (14) 
  SUPP_RCVR (23) 
  DSOR (11) 
  FMR_MOE_RL (4) 

V_FLIS_PART  REFERENCE/PART NUMBER  Disc 1
  NIIN (9) *+
  PART_NUMBER (32) 
  CAGE_CODE (5) 
  CAGE_STATUS (1) 
  RNCC (1) 
  RNVC (1) 
  DAC (1) 
  RNAAC (2) 
  RNFC (1) 
  RNSC (1) 
  RNJC (1) 
  SADC (2) 
  HCC (2) 
  MSDS (5) 
  MEDALS (1) 

V_FREIGHT  FREIGHT  Disc 1
  NIIN (9) *+
  ACTY_CD (2) 
  NMFC (6) 
  NMFC_SUB (1) 
  UFC (5) 
  HMC (2) 
  LTL (1) 
  LCL (1) 
  RVC (1) 
  WCC (3) 
  TCC (1) 
  SHC (1) 
  ADC (1) 
  ACC (2) 
  INTEG (1) 
  NMF_DESC (35) 

V_FLIS_PACKAGING_1  FLIS PACKAGING  Disc 1
  NIIN (9) *+
  PICA_SICA (1) 
  PKG_CAT (4) 
  UNPKG_ITEM_WEIGHT (6) 
  UNPKG_ITEM_DIM (12) 
  UI (2) 
  TOS (1) 
  ICQ (3) 
  MOP (2) 
  CLNG_DRYING (1) 
  PRES_MAT (2) 
  WRAP_MAT (2) 
  CUSH_DUN (2) 
  THK (1) 
  UNIT_CONT (2) 
  PKG_DATA_SOURCE (1) 

V_FLIS_PACKAGING_2  FLIS PACKAGING 2  Disc 1
  NIIN (9) *+
  PICA_SICA (1) 
  INTER_CONT (2) 
  UCL (1) 
  SPC_MKG (2) 
  LVL_A (1) 
  LVL_B (1) 
  LVL_C (1) 
  UNIT_PACK_WEIGHT (6) 
  UNIT_PACK_DIM (18) 
  UNIT_PACK_CUBE (8) 
  OPI (1) 
  SUPPLEMENTAL_INSTRUCTIONS (59) 

V_FLIS_PACKAGING_3  FLIS PACKAGING 3  Disc 1
  NIIN (9) *+
  PICA_SICA (1) 
  PKG_DESIGN_ACTY (5) 
  SPI_NO (10) 
  SPI_REV (1) 
  SPI_DATE (5) 
  CONT_NSN (13) 

V_DSS_WEIGHT_AND_CUBE  DISTRIBUTION STANDARD SYSTEM (DSS) WEIGHT AND CUBE  Disc 1
  NIIN (9) *+
  DSS_WEIGHT (12) 
  DSS_CUBE (12) 

V_CHARACTERISTICS  CHARACTERISTICS (DECODED)  Disc 1
  NIIN (9) *+
  MRC (4) 
  REQUIREMENTS_STATEMENT (104) 
  CLEAR_TEXT_REPLY (3097) 

V_CAGE_ADDRESS  ADDRESS INFORMATION  Disc 1
  CAGE_CODE (5) *+
  COMPANY_NAME (36) 
  COMPANY_NAME_2 (36) 
  COMPANY_NAME_3 (36) 
  COMPANY_NAME_4 (36) 
  COMPANY_NAME_5 (36) 
  STREET_ADDRESS_1 (36) 
  STREET_ADDRESS_2 (36) 
  PO_BOX (36) 
  CITY (36) 
  STATE (36) 
  ZIP (10) 
  COUNTRY (36) 
  DATE_EST (11) 
  LAST_UPDATE (11) 
  FORMER_NAME_1 (36) 
  FORMER_NAME_2 (36) 
  FORMER_NAME_3 (36) 
  FORMER_NAME_4 (36) 
  FRN_DOM (1) 

V_CAGE_STATUS_AND_TYPE  COMMERCIAL AND GOVERNMENT ENTITY (CAGE)  Disc 1
  CAGE_CODE (5) *+
  STATUS (1) 
  TYPE (1) 
  CAO (6) 
  ADP (6) 
  PHONE (20) 
  FAX (20) 
  RPLM_CODE (5) 
  PARENT_CAGE (5) 
  ASSOC_CODE (5) 
  AFFIL_CODE (1) 
  BUS_SIZE (1) 
  PRIMARY_BUSINESS (1) 
  TYPE_OF_BUSINESS (1) 
  WOMAN_OWNED (1) 
  CNGRSL_DSTRCT (3) 
  DESIGNATOR (1) 

V_H2_FSG  FEDERAL SUPPLY GROUP (FSG)  Disc 1
  FSC (4) *+
  FSG_TITLE (96) 
  FSG_NOTES (1708) 

V_H2_FSC  FEDERAL SUPPLY CLASS (FSC)  Disc 1
  FSC (4) *+
  FSC_TITLE (96) 
  FSC_NOTES (1325) 
  FSC_INCLUSIONS (778) 
  FSC_EXCLUSIONS (639) 

V_H3_AMMUNITION  AMMUNITION DATA (H3)  Disc 1
  DODIC (4) *+
  DODAC (9) 
  FSC (4) 
  INC_STATUS (1) 
  ITEM_NAME (58) 
  ITEM_DESCRIPTION (840) 

V_H5_CORPORATE  CORPORATE COMPLEX (H5)  Disc 1
  CAGE_CODE (5) *+
  PARENT_CAGE (0) 
  DESIGNATOR (1) 
  TYPE (1) 
  CAGE_STATUS (1) 
  ASSOCIATION_CAGE (5) 
  AFFILIATION_CODE (1) 
  CAO (6) 
  ADP (6) 

V_H5_DOMESTIC  DOMESTIC ADDRESS  Disc 1
  CAGE_CODE (5) *+
  STREET_1 (36) 
  STREET_2 (36) 
  PO_BOX (6) 
  CITY (25) 
  STATE (2) 
  ZIP (10) 
  COUNTRY (13) 
  PHONE (20) 
  FAX (20) 

V_H5_FOREIGN  FOREIGN ADDRESS  Disc 1
  CAGE_CODE (5) *+
  STREET_1 (36) 
  STREET_2 (36) 
  PO_BOX (36) 
  CITY (34) 
  PROVINCE (35) 
  COUNTRY (36) 
  POSTAL_ZONE (10) 
  PHONE (20) 
  FAX (20) 

V_H5_BUSINESS  BUSINESS  Disc 1
  CAGE_CODE (5) *+
  BUSINESS_SIZE (1) 
  PRIMARY_BUSINESS (1) 
  BUSINESS_TYPE (1) 
  WOMAN_OWNED (1) 
  CLEAR_TEXT (165) 

V_H6_NAME_INC  ITEM NAME  Disc 1
  INC (5) *+
  INC_STATUS (1) 
  CONCEPT_NO (1) 
  FIIG (6) 
  APP_KEY (3) 
  COND_CODE (1) 
  TYPE_CODE (1) 
  DT_ESTB_CANC (11) 
  DEFINITION (1762) 

V_H6_RELATED  RELATED INC(S)  Disc 1
  INC (5) *+
  RELATED_INC (5) 
  ITEM_NAME (137) 

V_H6_MODIFIER  FSC MODIFIER  Disc 1
  INC (5) *+
  FSC (4) 
  MODIFIER (96) 

V_FSC_IMM  FSC/IMM  Disc 1
  INC (5) *+
  FSC (4) 
  IMM (2) 

V_COLLOQUIAL_NAME  COLLOQUIAL NAMES  Disc 1
  INC (5) *+
  RELATED_INC (5) 
  COLLOQUIAL_NAME (32) 

V_ITEM_IDENTIFICATION_HISTORY  HISTORY IDENTIFICATION  Disc 1
  NIIN (9) *+
  INC (5) 
  ISC (1) 
  DEMIL_CODE (1) 
  CRITL_CODE (1) 
  PMIC (1) 
  CANCELLED_DATE (11) 
  NIIN_STATUS_CODE (1) 

V_MANAGEMENT_HISTORY  HISTORY MANAGEMENT  Disc 1
  NIIN (9) *+
  MOE (2) 
  SOS (3) 
  AAC (1) 
  UI (2) 
  UNIT_PRICE (10) 
  CIIC (1) 
  SLC (1) 
  QUP (1) 
  REPLACEMENT_FSC (4) 
  REPLACEMENT_NIIN (9) 
  USC (1) 

V_REFERENCE_NUMBER_HISTORY  HISTORY PART NUMBER  Disc 1
  NIIN (9) *+
  PART_NUMBER (32) 
  CAGE_CODE (5) 
  RNCC (1) 
  RNVC (1) 

