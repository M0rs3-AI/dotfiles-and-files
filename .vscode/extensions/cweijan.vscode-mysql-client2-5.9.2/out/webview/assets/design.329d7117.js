var v=Object.defineProperty;var H=(a,e,t)=>e in a?v(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var I=(a,e,t)=>(H(a,typeof e!="symbol"?e+"":e,t),t);import{i as C}from"./vscodeInject.c877a60d.js";import{_ as g,a as f}from"./select.878b0325.js";import{_ as M,a as T}from"./form.a7bc62be.js";import{_ as $}from"./dialog.0fcdf3fd.js";import{_ as O}from"./checkbox.988775e5.js";import{e as h,s as P}from"./notify.01023055.js";import{u as p}from"./umy-table.common.a6b28601.js";import{D as m,V as G,c as W}from"./codeMirror.068e734c.js";import{c as N,t as S,w as A,g as Y}from"./stringUtil.46430abd.js";import{n as L}from"./vueConfig.20091e32.js";import{A as U}from"./arrayUtil.e6340b6d.js";import"./scrollbar.2d2ca056.js";import"./index.f6f68cea.js";import"./focus.d0673314.js";import"./index.45082dd6.js";import"./index.0138aacd.js";class _{dropIndex(e,t){throw new Error("Method not implemented.")}updateColumnSql(e){throw new Error("Method not implemented.")}showVersion(){return null}showIndex(e,t){return null}createIndex(e){return null}showDatabases(){return null}updateUser(e){return null}showPackages(e){return null}showForeignKeys(e,t){return null}pingDataBase(e){return null}dropTriggerTemplate(e){return`DROP TRIGGER IF EXISTS ${e}`}}class k extends _{showVersion(){return"select version() server_version"}createIndex(e){const t=e.indexType||"btree";return`CREATE INDEX ${e.column}_${new Date().getTime()}_index ON ${e.table} USING ${t} (${e.column})`}dropIndex(e,t){return`DROP INDEX ${t}`}showIndex(e,t){return`select name index_name,is_in_sorting_key indexdef  FROM system.columns WHERE database = '${e}' and table ='${t}' and indexdef=1`}variableList(){return"select name , value as setting,description from system.settings s "}statusList(){return"select name as db , engine as status from system.databases d "}processList(){return`
    SELECT query_id AS "Id", user AS "User", client_hostname AS "Host", port AS "Port", current_database AS "db", query AS "Command", os_user AS "State", addSeconds(now(), elapsed) AS "Time", elapsed AS "Info"
    FROM system.processes p 
    ORDER BY elapsed desc`}addColumn(e,t){return`ALTER TABLE ${e} 
    ADD COLUMN [column] [type]`}createUser(){return"CREATE USER [name] WITH PASSWORD 'password'"}updateColumn(e,t){const{name:n,type:r,comment:o,nullable:s,defaultValue:l}=t;return`-- change column type
ALTER TABLE ${e} 
    ALTER COLUMN ${n} TYPE ${r};
-- change column name
ALTER TABLE ${e}  
    RENAME COLUMN ${n} TO [newColumnName]`}updateColumnSql(e){const{columnName:t,columnType:n,newColumnName:r,comment:o,nullable:s,table:l}=e;let i=`ALTER TABLE ${l} ALTER COLUMN ${t} TYPE ${n};
ALTER TABLE ${l} ALTER COLUMN ${t} ${s?"DROP NOT NULL":"SET NOT NULL"}`;return o&&(i=i+`COMMENT ON COLUMN ${l}.${t} is '${o}';`),t!=r&&(i=i+`ALTER TABLE ${l} RENAME COLUMN ${t} TO ${r};`),i}showUsers(){return"SELECT * FROM system.users"}pingDataBase(e){return"select 1"}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:o}=e;let s="";return o&&o!=r&&(s=`COMMENT ON TABLE ${t} IS '${o}';`),n&&t!=n&&(s+=`ALTER TABLE ${t} RENAME TO ${n};`),s}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE "',TABLE_NAME, '";') trun FROM INFORMATION_SCHEMA.TABLES WHERE  table_schema ='${e}' AND table_type='BASE TABLE';`}createDatabase(e){return"CREATE DATABASE $1"}showTableSource(e,t){return`SELECT create_table_query as "Create Table",name as table_name,'definition' as view_definition from system.tables WHERE database='${e}' and name='${t}'`}showViewSource(e,t){return`SELECT create_table_query as "Create View",name as table_name,'definition' as view_definition from system.tables WHERE database='${e}' and name='${t}'`}showProcedureSource(e,t){return"select number from system.numbers where 1=0"}showFunctionSource(e,t){return"select number from system.numbers where 1=0"}showTriggerSource(e,t){return"select number from system.numbers where 1=0"}showColumns(e,t){return`select name,type, null as maxLength,default_expression as defaultValue,is_in_primary_key as key from system.columns c where database='${e}' and table='${t}' `}showTriggers(e){return"select number from system.numbers where 1=0"}showProcedures(e){return"select number from system.numbers where 1=0"}showFunctions(e){return`select name as "ROUTINE_NAME" from system.functions  where origin !='System'`}showViews(e){return`select name ,engine as type from system.tables where database='${e}' and engine = 'View' ORDER BY name`}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n}`}countSql(e,t){return`SELECT count(*) FROM ${e}.${t}`}showTables(e){return`select name, engine as type from system.tables where database='${e}' and engine <> 'View' ORDER BY name`}showDatabases(){return"SELECT name as Database FROM system.databases where name not in ('information_schema','INFORMATION_SCHEMA') order by name ASC"}showSchemas(){return this.showDatabases()}tableTemplate(){return`CREATE TABLE $1(  
    id UInt64,
    create_time DATETIME,
    $2 String 
)
ENGINE = MergeTree()
ORDER BY (id)
PRIMARY KEY(id);`}viewTemplate(){return`CREATE VIEW $1
AS
SELECT * FROM $2`}procedureTemplate(){return"select number from system.numbers where 1=0"}triggerTemplate(){return"select number from system.numbers where 1=0"}dropTriggerTemplate(e){return"select number from system.numbers where 1=0"}functionTemplate(){return"CREATE FUNCTION [func_name] AS (a, b, c) -> a * b * c;"}}class d{constructor(e="",t=" "){I(this,"toString",()=>this.command);this.command=e,this.separator=t}sep(e){return this.separator=e,this}append(...e){if(e)for(const t of e){const n=t instanceof Function?t():t;this.command=this.command?`${this.command}${this.separator}${n}`:n}return this}if(e,...t){return e&&this.append(...t),this}condition(e,t){return e&&t(this),this}}class V extends _{showVersion(){return""}createIndex(e){return`ALTER TABLE ${e.table} ADD ${e.type||"key"} ("${e.column||"[column]"}")`}dropIndex(e,t){return`ALTER TABLE ${e} DROP INDEX "${t}"`}showIndex(e,t){return`SELECT column_name "column_name",index_name "index_name",index_type "index_type",non_unique=0 "isUnique" FROM INFORMATION_SCHEMA.STATISTICS WHERE table_schema='${e}' and table_name='${t}';`}variableList(){return"show global VARIABLES"}statusList(){return"show global status"}processList(){return"show processlist"}addColumn(e,t){const n=t?` AFTER "${t}"`:"";return`ALTER TABLE ${e} 
    ADD COLUMN [column] [type] COMMENT ''${n};`}createUser(){return`CREATE USER 'username'@'%' IDENTIFIED BY 'password';
-- Grant select privilege to all databases;
GRANT SELECT ON *.* TO 'username'@'%' WITH GRANT OPTION;
-- Grant all privileges to all databases;
GRANT ALL PRIVILEGES ON *.* TO 'username'@'%' WITH GRANT OPTION;`}updateUser(e){return`update mysql.user set 
    password = PASSWORD("newPassword")
    where User = '${e}';
FLUSH PRIVILEGES;
-- since mysql version 5.7, password column need change to authentication_string=PASSWORD("newPassword")`}updateColumn(e,t){var u;const{name:n,type:r,comment:o,nullable:s,defaultValue:l,extra:E,character_set_name:i,collation_name:c}=t;return new d(`ALTER TABLE ${e}`).append(`
	CHANGE ${n} ${n} ${r}`).if(i,`CHARACTER SET ${i}`).if(c,`COLLATE ${c}`).if(s!="YES","NOT NULL").if((u=E==null?void 0:E.toLowerCase())==null?void 0:u.includes("auto_increment"),"AUTO_INCREMENT").if(o,`COMMENT '${o}'`).if(l,`DEFAULT ${l=="CURRENT_TIMESTAMP"?l:`'${l}'`}`).toString()}updateColumnSql(e){const{table:t,columnName:n,name:r,type:o,isNotNull:s,isAutoIncrement:l,comment:E,defaultValue:i,character_set_name:c,collation_name:u}=e;return new d(`ALTER TABLE "${t}"`).append(`
	CHANGE "${n}" "${r}" ${o}`).if(c,`CHARACTER SET ${c}`).if(u,`COLLATE ${u}`).if(s,"NOT NULL").if(l,"AUTO_INCREMENT").if(E,`COMMENT '${E}'`).if(i,`DEFAULT ${i=="CURRENT_TIMESTAMP"?i:`'${i}'`}`).append(";").toString()}showUsers(){return"SELECT concat(user,'@',host) user FROM mysql.user;"}pingDataBase(e){return e?null:"select 1"}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:o}=e;let s="";return o&&o!=r&&(s=`ALTER TABLE "${t}" COMMENT = '${o}';`),n&&t!=n&&(s+=`ALTER TABLE "${t}" RENAME TO "${n}";`),s}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE "',table_schema,'"."',TABLE_NAME, '";') trun FROM INFORMATION_SCHEMA.TABLES where  table_schema ='${e}' and TABLE_TYPE<>'VIEW';`}createDatabase(e){return"CREATE DATABASE $1;"}showTableSource(e,t){return`SHOW CREATE TABLE "${e}"."${t}";`}showViewSource(e,t){return`SHOW CREATE VIEW  "${e}"."${t}";`}showProcedureSource(e,t){return`SHOW CREATE PROCEDURE "${e}"."${t}";`}showFunctionSource(e,t){return`SHOW CREATE FUNCTION "${e}"."${t}";`}showTriggerSource(e,t){return`SHOW CREATE TRIGGER "${e}"."${t}";`}showColumns(e,t){return`SELECT COLUMN_NAME name,DATA_TYPE simpleType, DATA_TYPE type, IS_NULLABLE nullable 
            FROM information_schema.columns WHERE table_schema = '${e}' AND table_name = '${t}' ORDER BY ORDINAL_POSITION;`}showTriggers(e,t){const n=t?` AND EVENT_OBJECT_TABLE='${t}'`:"";return`SELECT TRIGGER_NAME FROM information_schema.TRIGGERS WHERE TRIGGER_SCHEMA = '${e}' ${n} ORDER BY TRIGGER_NAME;`}showProcedures(e){return`SELECT ROUTINE_NAME FROM information_schema.routines WHERE ROUTINE_SCHEMA = '${e}' and ROUTINE_TYPE='PROCEDURE' ORDER BY ROUTINE_NAME`}showFunctions(e){return`SELECT ROUTINE_NAME FROM information_schema.routines WHERE ROUTINE_SCHEMA = '${e}' and ROUTINE_TYPE='FUNCTION' ORDER BY ROUTINE_NAME`}showViews(e){return`SELECT TABLE_NAME name FROM information_schema.VIEWS  WHERE TABLE_SCHEMA = '${e}' ORDER BY TABLE_NAME`}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n};`}countSql(e,t){return`SELECT count(*) FROM ${t};`}showTables(e){return`SELECT TABLE_COMMENT "comment",TABLE_NAME "name",TABLE_ROWS "table_rows",AUTO_INCREMENT "auto_increment",row_format "row_format",DATA_LENGTH "data_length",INDEX_LENGTH "index_length" FROM information_schema.TABLES  WHERE TABLE_SCHEMA = '${e}' and TABLE_TYPE<>'VIEW' ORDER BY TABLE_NAME;`}showDatabases(){return'SELECT SCHEMA_NAME "Database" FROM information_schema.schemata ORDER BY "Database";'}showSchemas(){return this.showDatabases()}tableTemplate(){return`CREATE TABLE table_name(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME COMMENT 'Create Time',
    update_time DATETIME COMMENT 'Update Time',
    content VARCHAR(255) COMMENT 'content'
) DEFAULT CHARSET UTF8 COMMENT 'newTable';`}viewTemplate(){return`CREATE VIEW view_name
AS
SELECT * FROM `}procedureTemplate(){return`CREATE PROCEDURE procedure_name()
BEGIN

END;`}triggerTemplate(){return`CREATE TRIGGER trigger_name
[BEFORE/AFTER] [INSERT/UPDATE/DELETE]
ON [table]
FOR EACH ROW BEGIN

END;`}functionTemplate(){return`CREATE FUNCTION function_name() RETURNS int
BEGIN
    return 0;
END;`}}class y extends _{showVersion(){return`select RTRIM(SUBSTR(REPLACE(banner,'Oracle Database ',''),1,3)) "server_version" from v$version where rownum=1`}createIndex(e){const{table:t,column:n}=e;return`CREATE INDEX ${`${t}_${n}`} ON ${t}(${n})`}dropIndex(e,t){return`DROP INDEX ${t}`}showIndex(e,t){return`SELECT COLUMN_NAME "column_name",INDEX_NAME "index_name" from DBA_IND_COLUMNS WHERE TABLE_OWNER='${e}' and TABLE_NAME='${t}'`}variableList(){return"show global VARIABLES"}statusList(){return"show global status"}processList(){return"show processlist"}addColumn(e,t){return`ALTER TABLE ${e} 
    ADD [column] [type];
COMMENT ON COLUMN ${e}.[column] IS 'comment'`}createUser(){return`CREATE USER $1 IDENTIFIED BY [password$2];
GRANT CONNECT TO $1;
ALTER USER $1 quota unlimited on USERS;
        `}updateUser(e){return`ALTER USER ${e} IDENTIFIED BY [new_password]`}updateColumn(e,t){const{name:n,type:r,comment:o,nullable:s,defaultValue:l}=t;return`-- change column type
ALTER TABLE ${e} MODIFY ${n} ${r};
-- change column name
ALTER TABLE ${e} RENAME COLUMN ${n} TO [newColumnName];
COMMENT ON COLUMN ${e}.${n} IS '${o||""}'`}updateColumnSql(e){const{columnName:t,columnType:n,newColumnName:r,comment:o,defaultValue:s,table:l,isNotNull:E,oldRow:i}=e;return new d("","").if(n!=i.type,`ALTER TABLE "${l}" MODIFY "${t}" ${n};`).if(E!=i.isNotNull,`
ALTER TABLE "${l}" MODIFY "${t}"${E?"NOT NULL":"NULL"};`).if(s!=null&&s!=i.defaultValue,`
ALTER TABLE "${l}" MODIFY "${t}" DEFAULT ${s!=null&&s.match(/(:|nextval)/i)?s:`'${s==null?void 0:s.replace(/(^'|'$)/g,"")}'`};`).if(o&&o!=i.comment,`
COMMENT ON COLUMN "${l}"."${t}" is '${o}';`).if(t!=r,`
ALTER TABLE "${l}" RENAME COLUMN "${t}" TO "${r}";`).toString()}showUsers(){return'SELECT username "user" FROM all_users'}pingDataBase(e){return e?`ALTER SESSION SET current_schema = "${e}"`:"select 1"}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:o}=e;let s="";return o&&o!=r&&(s=`COMMENT ON TABLE "${t}" IS '${o}';`),n&&t!=n&&(s+=`ALTER TABLE "${t}" RENAME TO "${n}"`),s}truncateDatabase(e){return`SELECT 'TRUNCATE TABLE "' || owner || '"."' || object_name || '";' trun FROM all_objects where  owner ='${e}' and object_type ='TABLE'`}createDatabase(e){return"CREATE USER $1 IDENTIFIED BY password$2;"}showTableSource(e,t){return""}showViewSource(e,t,n){return n.isMaterial()?`select QUERY "Create View" from ALL_MVIEWS where OWNER='${e}' and mview_name='${t}'`:`SELECT 'CREATE VIEW ' || view_name || ' AS
' || TEXT_VC  "Create View" FROM ALL_VIEWS WHERE OWNER='${e}' AND view_name='${t}'`}showProcedureSource(e,t){return`SELECT 'CREATE ' || LISTAGG(text) within group(order by line) "Create Procedure"
        FROM all_source
       WHERE owner = '${e}'
         AND name  = '${t}'
       ORDER BY line`}showFunctionSource(e,t){return`SELECT 'CREATE ' || LISTAGG(text) within group( order by line ) "Create Function"
        FROM all_source
       WHERE owner = '${e}'
         AND name  = '${t}'
       ORDER BY line`}showTriggerSource(e,t){return`SHOW CREATE TRIGGER \`${e}\`.\`${t}\``}showColumns(e,t){return e?`select
        a.COLUMN_NAME "name",
        a.DATA_DEFAULT "defaultValue",
        a.DATA_TYPE "simpleType",
        a.DATA_TYPE || '(' || a.data_length || ')' "type",
        a.data_length "maxLength",
        a.NULLABLE "nullable",
        c.CONSTRAINT_TYPE "key",
        cc.COMMENTS "comment"
      from
        all_tab_columns a
        left join all_col_comments cc on a.COLUMN_NAME=cc.COLUMN_NAME and a.OWNER=cc.OWNER and a.table_name=cc.table_name
        left join ALL_CONS_COLUMNS b on a.COLUMN_NAME=b.COLUMN_NAME and a.OWNER=b.OWNER and a.table_name=b.table_name
        left join DBA_CONSTRAINTS c on b.CONSTRAINT_NAME=c.CONSTRAINT_NAME 
      where
        a.owner = '${e}'
        and a.table_name = '${t}'`:`select
a.COLUMN_NAME "name",
a.DATA_DEFAULT "defaultValue",
a.DATA_TYPE "simpleType",
a.DATA_TYPE || '(' || a.data_length || ')' "type",
a.data_length "maxLength",
a.NULLABLE "nullable",
c.CONSTRAINT_TYPE "key",
cc.COMMENTS "comment"
from
    user_tab_columns a
    left join user_col_comments cc on a.COLUMN_NAME = cc.COLUMN_NAME and a.table_name = cc.table_name
    left join user_CONS_COLUMNS b on a.COLUMN_NAME = b.COLUMN_NAME and a.table_name = b.table_name
    left join user_constraints c on b.CONSTRAINT_NAME = c.CONSTRAINT_NAME and a.table_name = c.table_name
where
a.table_name = '${t}'`}showTriggers(e,t){const n=t?` AND TABLE_NAME='${t}'`:"";return`SELECT * FROM all_triggers WHERE TABLE_OWNER='${e}' ${n} ORDER BY TRIGGER_NAME`}showPackages(e){return`SELECT object_name "name" FROM ALL_OBJECTS WHERE OBJECT_TYPE IN ('PACKAGE') and owner='${e}' ORDER BY "name"`}showProcedures(e){return`select object_name "ROUTINE_NAME" from all_objects where object_type = 'PROCEDURE' and owner='${e}' ORDER BY "ROUTINE_NAME"`}showFunctions(e){return`select object_name "ROUTINE_NAME" from all_objects where object_type = 'FUNCTION' and owner='${e}' ORDER BY "ROUTINE_NAME"`}showViews(e){return`select object_type "type",object_name "name" from all_objects where object_type in ('VIEW','MATERIALIZED VIEW') and owner='${e}' ORDER BY "type","name"`}buildPageSql(e,t,n){return`SELECT * FROM ${t} WHERE ROWNUM <= ${n}`}countSql(e,t){return`SELECT count(*) FROM ${t}`}showTables(e){return`select t.table_name "name",nvl(num_rows,-1)  "table_rows",c.COMMENTS "comment" from all_tables t
        join ALL_TAB_COMMENTS c on t.OWNER = c.OWNER and t.TABLE_NAME = c.TABLE_NAME
        join all_objects o on t.OWNER = o.OWNER and t.TABLE_NAME = o.object_name and o.object_type='TABLE'
        where t.owner='${e}' ORDER BY "name"`}showDatabases(){return'select username as "Database" from sys.all_users order by username'}showSchemas(){return'select username as "Database" from sys.all_users order by username'}tableTemplate(){return`CREATE TABLE $1(  
    id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    create_time DATE,
    name$2 VARCHAR2(255)
);
COMMENT ON TABLE $1 IS '$3';
COMMENT ON COLUMN $1.$2 IS '$4'`}viewTemplate(){return`CREATE VIEW $1
AS
SELECT * FROM $2`}procedureTemplate(){return`CREATE PROCEDURE $1(x IN OUT NUMBER, y OUT NUMBER)
IS
BEGIN
   $2
   y:=4 * x;
END;`}triggerTemplate(){return`CREATE TRIGGER trigger_name 
[BEFORE/AFTER] [INSERT/UPDATE/DELETE]
ON [table]
FOR EACH ROW BEGIN

END`}functionTemplate(){return`CREATE FUNCTION $1(x IN NUMBER) 
RETURN NUMBER 
BEGIN 
    $2
    RETURN x*2;
END;`}}class q extends y{showVersion(){return`SELECT REPLACE(banner,'DM Database Server 64 ','') "server_version"  FROM v$version where rownum=1;`}createIndex(e){const{table:t,column:n="$2"}=e;return`CREATE INDEX ${`${t}_${n}`} ON ${t}(${n});`}dropIndex(e,t){return`DROP INDEX ${t};`}showIndex(e,t){return`SELECT COLUMN_NAME "column_name",INDEX_NAME "index_name" from DBA_IND_COLUMNS WHERE TABLE_OWNER='${e}' and TABLE_NAME='${t}';`}variableList(){return"show global VARIABLES"}statusList(){return"show global status"}processList(){return"show processlist"}addColumn(e,t){return`ALTER TABLE ${e} 
    ADD COLUMN $1 $2;
COMMENT ON COLUMN ${e}.$3 IS 'comment$4';`}createUser(){return"CREATE USER $1 IDENTIFIED BY [password]$2;"}updateUser(e){return`ALTER USER ${e} IDENTIFIED BY [new_password];`}updateColumn(e,t){const{name:n,type:r,comment:o,nullable:s,defaultValue:l}=t;return`-- change column type
ALTER TABLE ${e} MODIFY ${n} ${r};
-- change column name
ALTER TABLE ${e} RENAME COLUMN ${n} TO [newColumnName];
COMMENT ON COLUMN ${e}.${n} IS '${o||""}';`}updateColumnSql(e){const{columnName:t,columnType:n,newColumnName:r,comment:o,defaultValue:s,table:l,isNotNull:E,oldRow:i}=e;return new d("","").if(n!=i.type,`ALTER TABLE "${l}" MODIFY "${t}" ${n};`).if(E!=i.isNotNull,`
ALTER TABLE "${l}" MODIFY "${t}"${E?"NOT NULL":"NULL"};`).if(s!=null&&s!=i.defaultValue,`
ALTER TABLE "${l}" MODIFY "${t}" DEFAULT ${s!=null&&s.match(/(:|nextval)/i)?s:`'${s==null?void 0:s.replace(/(^'|'$)/g,"")}'`};`).if(o&&o!=i.comment,`
COMMENT ON COLUMN "${l}"."${t}" is '${o}';`).if(t!=r,`
ALTER TABLE "${l}" RENAME COLUMN "${t}" TO "${r}";`).toString()}showUsers(){return'SELECT username "user" FROM all_users'}pingDataBase(e){return e?`set SCHEMA ${e}`:"select 1"}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:o}=e;let s="";return o&&o!=r&&(s=`COMMENT ON TABLE "${t}" IS '${o}';`),n&&t!=n&&(s+=`ALTER TABLE "${t}" RENAME TO "${n}"`),s}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE \`',table_schema,'\`.\`',TABLE_NAME, '\`;') trun FROM INFORMATION_SCHEMA.TABLES where  table_schema ='${e}' and TABLE_TYPE<>'VIEW';`}createDatabase(e){return"CREATE USER [name] IDENTIFIED BY [password];"}showTableSource(e,t){return`CALL SP_TABLEDEF('${e}', '${t}');`}showViewSource(e,t){return`CALL SP_VIEWDEF('${e}', '${t}');`}showProcedureSource(e,t){return`SELECT LISTAGG(text) within group(order by line) "Create Procedure"
        FROM all_source
       WHERE owner = '${e}'
         AND name  = '${t}'
       ORDER BY line`}showFunctionSource(e,t){return`select DBMS_METADATA.GET_DDL('FUNCTION', '${t}','${e}') "Create Function";`}showTriggerSource(e,t){return`SHOW CREATE TRIGGER \`${e}\`.\`${t}\`;`}showColumns(e,t){return`select
        a.COLUMN_NAME "name",
        a.DATA_DEFAULT "defaultValue",
        a.DATA_TYPE "simpleType",
        CONCAT(a.DATA_TYPE,'(',a.data_length,')') "type",
        a.data_length "maxLength",
        a.NULLABLE "nullable",
        c.CONSTRAINT_TYPE "key",
        cc.COMMENTS "comment"
      from
        all_tab_columns a
        left join all_col_comments cc on a.COLUMN_NAME=cc.COLUMN_NAME and a.OWNER=cc.SCHEMA_NAME and a.table_name=cc.table_name
        left join ALL_CONS_COLUMNS b on a.COLUMN_NAME=b.COLUMN_NAME and a.OWNER=b.OWNER and a.table_name=b.table_name
        left join DBA_CONSTRAINTS c on b.CONSTRAINT_NAME=c.CONSTRAINT_NAME
      where
        a.owner = '${e}'
        and a.table_name = '${t}';`}showTriggers(e,t){const n=t?` AND TABLE_NAME='${t}'`:"";return`SELECT * FROM all_triggers WHERE TABLE_OWNER='${e}' ${n} ORDER BY TRIGGER_NAME`}showProcedures(e){return`select object_name "ROUTINE_NAME" from all_objects where object_type = 'PROCEDURE' and owner='${e}' ORDER BY "ROUTINE_NAME";`}showFunctions(e){return`select object_name "ROUTINE_NAME" from all_objects where object_type = 'FUNCTION' and owner='${e}' ORDER BY "ROUTINE_NAME";`}showViews(e){return`select object_name "name" from all_objects where object_type = 'VIEW' and owner='${e}';`}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n};`}countSql(e,t){return`SELECT count(*) FROM ${t};`}showTables(e){return`SELECT a.object_name "name",b.COMMENTS "comment" from all_objects a
join ALL_TAB_COMMENTS b on a.OWNER=b.OWNER and a.object_name=b.TABLE_NAME
where a.object_type = 'TABLE' and a.owner='${e}' and a.TEMPORARY<>'Y';`}showDatabases(){return`select object_name "Database" from all_objects where object_type = 'SCH';`}showSchemas(){return`select object_name "Database" from all_objects where object_type = 'SCH';`}tableTemplate(){return`CREATE TABLE $1(  
    id int NOT NULL PRIMARY KEY IDENTITY(1,1),
    create_time DATETIME,
    name$2 VARCHAR(255)
);
COMMENT ON TABLE $1 IS '$3';
COMMENT ON COLUMN $1.$2 IS '$4';`}viewTemplate(){return`CREATE VIEW $1
AS
SELECT * FROM $2`}procedureTemplate(){return`CREATE PROCEDURE $1(x IN OUT NUMBER, y OUT NUMBER)
IS
BEGIN
   $2
   y:=4 * x;
END;`}triggerTemplate(){return`CREATE TRIGGER trigger_name 
[BEFORE/AFTER] [INSERT/UPDATE/DELETE]
ON [table]
FOR EACH ROW BEGIN

END;`}functionTemplate(){return`CREATE FUNCTION $1(x IN int) RETURN int$2
AS
BEGIN
    $3
    return x*2;
END;`}}class j extends _{variableList(){throw new Error("Method not implemented.")}statusList(){throw new Error("Method not implemented.")}processList(){throw new Error("Method not implemented.")}updateColumn(e,t){return""}showSchemas(){return""}showTables(e){return""}addColumn(e,t){return""}showColumns(e,t){return""}showViews(e){return""}showUsers(){return""}createUser(){return""}showTriggers(e){return""}showProcedures(e){return""}showFunctions(e){return""}buildPageSql(e,t,n){return""}countSql(e,t){return""}createDatabase(e){return""}truncateDatabase(e){return""}updateTable(e){return""}showTableSource(e,t){return""}showViewSource(e,t){return""}showProcedureSource(e,t){return""}showFunctionSource(e,t){return""}showTriggerSource(e,t){return""}tableTemplate(){return`// Create index
PUT /$1
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 1
    },
    "mappings": {
        "properties": {
          "id": {
            "type": "integer"
          },
          "name": {
            "type": "text"
          }
        }
    }
}`}viewTemplate(){return""}procedureTemplate(){return""}triggerTemplate(){return""}functionTemplate(){return""}}class X extends _{showVersion(){return"select replace(@@version,'-MariaDB','') server_version;"}createIndex(e){let t=`${e.type||"key"}`;return t.match(/BTREE/i)&&(t="key"),`ALTER TABLE ${e.table} ADD ${t} (\`${e.column||"$1"}\`)`}dropIndex(e,t){return`ALTER TABLE ${e} DROP INDEX \`${t}\``}showIndex(e,t){return`SELECT column_name "column_name",index_name "index_name",index_type "index_type",non_unique=0 "isUnique" FROM INFORMATION_SCHEMA.STATISTICS WHERE table_schema='${e}' and table_name='${t}';`}variableList(){return"show global VARIABLES"}statusList(){return"show global status"}processList(){return"show processlist"}addColumn(e,t){const n=t?` AFTER \`${t}\``:"";return`ALTER TABLE ${e} 
    ADD COLUMN $1 [type]$2 COMMENT '$3'${n};`}createUser(){return`CREATE USER 'username'@'%' IDENTIFIED BY 'password';
-- Grant select privilege to all databases;
GRANT SELECT ON *.* TO 'username'@'%' WITH GRANT OPTION;
-- Grant all privileges to all databases;
GRANT ALL PRIVILEGES ON *.* TO 'username'@'%' WITH GRANT OPTION;`}updateUser(e){return`update mysql.user set 
    password = PASSWORD("newPassword")
    where User = '${e}';
FLUSH PRIVILEGES;
-- since mysql version 5.7, password column need change to authentication_string=PASSWORD("newPassword")`}updateColumn(e,t){var R;const{name:n,type:r,comment:o,nullable:s,defaultValue:l,extra:E,character_set_name:i,collation_name:c}=t,u=s!="YES";return new d(`ALTER TABLE ${e}`).append(`
	CHANGE ${n} ${n} ${r}`).if(i,`CHARACTER SET ${i}`).if(c,`COLLATE ${c}`).if(u,"NOT NULL").if((R=E==null?void 0:E.toLowerCase())==null?void 0:R.includes("auto_increment"),"AUTO_INCREMENT").if(o,`COMMENT '${o}'`).if(N(l)&&!u,"DEFAULT NULL").if(!N(l),`DEFAULT ${l=="CURRENT_TIMESTAMP"?l:`'${S(l)}'`}`).toString()}updateColumnSql(e){const{table:t,columnName:n,name:r,type:o,isNotNull:s,isAutoIncrement:l,comment:E,defaultValue:i,character_set_name:c,collation_name:u}=e;return new d(`ALTER TABLE \`${t}\``).append(`
	CHANGE \`${n}\` \`${r}\` ${o}`).if(c,`CHARACTER SET ${c}`).if(u,`COLLATE ${u}`).if(s,"NOT NULL").if(l,"AUTO_INCREMENT").if(E,`COMMENT '${E}'`).if(N(i)&&!s,"DEFAULT NULL").if(!N(i),`DEFAULT ${i=="CURRENT_TIMESTAMP"?i:`'${S(i)}'`}`).append(";").toString()}showUsers(){return"SELECT user user,host host FROM mysql.user;"}pingDataBase(e){return e?`use \`${e}\``:"select 1"}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:o}=e;let s="";return o&&o!=r&&(s=`ALTER TABLE \`${t}\` COMMENT = '${o}';`),n&&t!=n&&(s+=`ALTER TABLE \`${t}\` RENAME TO \`${n}\`;`),s}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE \`',table_schema,'\`.\`',TABLE_NAME, '\`;') trun FROM INFORMATION_SCHEMA.TABLES where  table_schema ='${e}' and TABLE_TYPE<>'VIEW';`}createDatabase(e){return`CREATE DATABASE $1
    DEFAULT CHARACTER SET = 'utf8mb4';`}showTableSource(e,t){return`SHOW CREATE TABLE \`${e}\`.\`${t}\`;`}showViewSource(e,t){return`SHOW CREATE VIEW  \`${e}\`.\`${t}\`;`}showProcedureSource(e,t){return`SHOW CREATE PROCEDURE \`${e}\`.\`${t}\`;`}showFunctionSource(e,t){return`SHOW CREATE FUNCTION \`${e}\`.\`${t}\`;`}showTriggerSource(e,t){return`SHOW CREATE TRIGGER \`${e}\`.\`${t}\`;`}showColumns(e,t,n){return n?`SELECT c.COLUMN_NAME name, c.DATA_TYPE simpleType,
            if(CHARACTER_MAXIMUM_LENGTH,CONCAT(DATA_TYPE,'(',CHARACTER_MAXIMUM_LENGTH,')'), DATA_TYPE) type,
            c.COLUMN_COMMENT comment, c.COLUMN_KEY \`key\`, c.IS_NULLABLE nullable, c.CHARACTER_MAXIMUM_LENGTH maxLength, c.COLUMN_DEFAULT defaultValue, c.EXTRA extra, c.COLLATION_NAME collation_name, c.CHARACTER_SET_NAME character_set_name,
            ik.REFERENCED_TABLE_NAME referenced_table_name, ik.REFERENCED_COLUMN_NAME referenced_column_name
        FROM information_schema.columns c
            left join information_schema.KEY_COLUMN_USAGE ik on c.table_schema = ik.TABLE_SCHEMA
            and c.table_name = ik.TABLE_NAME and c.COLUMN_NAME=ik.COLUMN_NAME
        WHERE c.table_schema = '${e}' AND c.table_name = '${t}'
        ORDER BY c.ORDINAL_POSITION;`:`SELECT COLUMN_NAME name,DATA_TYPE simpleType,
        if(CHARACTER_MAXIMUM_LENGTH,CONCAT(DATA_TYPE,'(',CHARACTER_MAXIMUM_LENGTH,')'), DATA_TYPE) type,
        COLUMN_COMMENT comment,COLUMN_KEY \`key\`,IS_NULLABLE nullable,CHARACTER_MAXIMUM_LENGTH maxLength,COLUMN_DEFAULT defaultValue,EXTRA extra,COLLATION_NAME collation_name,CHARACTER_SET_NAME character_set_name FROM information_schema.columns WHERE table_schema = '${e}' AND table_name = '${t}' ORDER BY ORDINAL_POSITION;`}showTriggers(e,t){const n=t?` AND EVENT_OBJECT_TABLE='${t}'`:"";return`SELECT TRIGGER_NAME FROM information_schema.TRIGGERS WHERE TRIGGER_SCHEMA = '${e}' ${n} ORDER BY TRIGGER_NAME;`}showProcedures(e){return`SELECT ROUTINE_NAME FROM information_schema.routines WHERE ROUTINE_SCHEMA = '${e}' and ROUTINE_TYPE='PROCEDURE' ORDER BY ROUTINE_NAME`}showFunctions(e){return`SELECT ROUTINE_NAME FROM information_schema.routines WHERE ROUTINE_SCHEMA = '${e}' and ROUTINE_TYPE='FUNCTION' ORDER BY ROUTINE_NAME`}showViews(e){return`SELECT TABLE_NAME name FROM information_schema.VIEWS  WHERE TABLE_SCHEMA = '${e}' ORDER BY TABLE_NAME`}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n};`}countSql(e,t){return`SELECT count(*) FROM ${t};`}showTables(e){return`SELECT TABLE_COMMENT "comment",TABLE_NAME "name",TABLE_ROWS "table_rows",AUTO_INCREMENT "auto_increment",
        row_format "row_format",DATA_LENGTH "data_length",INDEX_LENGTH "index_length",TABLE_COLLATION "collation"
        FROM information_schema.TABLES  WHERE TABLE_SCHEMA = '${e}' and TABLE_TYPE<>'VIEW' ORDER BY TABLE_NAME;`}showDatabases(){return"SELECT SCHEMA_NAME `Database`,DEFAULT_CHARACTER_SET_NAME `charset`,DEFAULT_COLLATION_NAME `collation` FROM information_schema.schemata ORDER BY `Database`;"}showSchemas(){return this.showDatabases()}tableTemplate(){return`CREATE TABLE $1(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME COMMENT 'Create Time',
    name$2 VARCHAR(255)
) COMMENT '$4';`}viewTemplate(){return`CREATE VIEW $1
AS
SELECT * FROM $2`}procedureTemplate(){return`CREATE PROCEDURE $1()
BEGIN

END;`}triggerTemplate(){return`CREATE TRIGGER $1
BEFORE INSERT ON table$2
FOR EACH ROW BEGIN
    $3
END;`}functionTemplate(){return`CREATE FUNCTION $1() RETURNS int$2
BEGIN
    $3
    return 0;
END;`}}class K extends _{showVersion(){return"show version"}showDatabases(){return"show dbs"}buildPageSql(e,t,n){return`db('${e}').collection('${t}').find({}).limit(${n}).toArray()`}pingDataBase(e){return null}dropIndex(e,t){throw new Error("Method not implemented.")}updateColumnSql(e){throw new Error("Method not implemented.")}showIndex(e,t){return`db('${e}').collection('${t}').indexes();`}createIndex(e){const{database:t,table:n,column:r}=e;return`db('${t}').collection('${n}').createIndex({ ${r||"column_name"}: 1 });`}showSchemas(){throw new Error("Method not implemented.")}updateTable(e){throw new Error("Method not implemented.")}updateColumn(e,t){throw new Error("Method not implemented.")}showTables(e){throw new Error("Method not implemented.")}addColumn(e,t){throw new Error("Method not implemented.")}showColumns(e,t){throw new Error("Method not implemented.")}showViews(e){throw new Error("Method not implemented.")}showSystemViews(e){throw new Error("Method not implemented.")}showUsers(){throw new Error("Method not implemented.")}createUser(){throw new Error("Method not implemented.")}showTriggers(e){throw new Error("Method not implemented.")}showProcedures(e){throw new Error("Method not implemented.")}showFunctions(e){throw new Error("Method not implemented.")}countSql(e,t){throw new Error("Method not implemented.")}createDatabase(e){return'db("dbv").createCollection("collection")'}truncateDatabase(e){throw new Error("Method not implemented.")}renameTable(e,t,n){throw new Error("Method not implemented.")}showTableSource(e,t){throw new Error("Method not implemented.")}showViewSource(e,t){throw new Error("Method not implemented.")}showProcedureSource(e,t){throw new Error("Method not implemented.")}showFunctionSource(e,t){throw new Error("Method not implemented.")}showTriggerSource(e,t){throw new Error("Method not implemented.")}tableTemplate(){throw new Error("Method not implemented.")}viewTemplate(){throw new Error("Method not implemented.")}procedureTemplate(){throw new Error("Method not implemented.")}triggerTemplate(){throw new Error("Method not implemented.")}functionTemplate(){throw new Error("Method not implemented.")}processList(){throw new Error("Method not implemented.")}variableList(){throw new Error("Method not implemented.")}statusList(){throw new Error("Method not implemented.")}dropTriggerTemplate(e){throw new Error("Method not implemented.")}}class J extends _{showVersion(){return"SELECT CAST(SERVERPROPERTY('ProductVersion') AS SYSNAME)+' '+CAST(SERVERPROPERTY('Edition') AS SYSNAME) AS server_version"}createIndex(e){return`ALTER TABLE ${e.table} ADD ${e.type} (${e.column})`}dropIndex(e,t){return`DROP INDEX ${e}.${t}`}showIndex(e,t){return`SELECT
        index_name = ind.name,
        column_name = col.name,
        ind.is_primary_key,
        ind.is_unique,
        ind.is_unique_constraint
      FROM
        sys.indexes ind
        INNER JOIN sys.index_columns ic ON ind.object_id = ic.object_id
        and ind.index_id = ic.index_id
        INNER JOIN sys.columns col ON ic.object_id = col.object_id
        and ic.column_id = col.column_id
        INNER JOIN sys.tables t ON ind.object_id = t.object_id
      WHERE
        t.name = '${t}';`}variableList(){throw new Error("Method not implemented.")}statusList(){throw new Error("Method not implemented.")}processList(){return"sp_who"}addColumn(e,t){return`ALTER TABLE ${e} 
    ADD $1 [type]$2;`}createUser(){return"CREATE LOGIN [name] WITH PASSWORD = 'password';"}updateColumn(e,t){const{name:n,type:r,comment:o,nullable:s,defaultValue:l}=t,E=s=="YES"?"NULL":"NOT NULL";return`-- change column type
ALTER TABLE ${e} 
    ALTER COLUMN ${n} ${r} ${E};
-- change column name
EXEC sp_rename '${e}.${n}', '${n}', 'COLUMN';`}updateColumnSql(e){const{columnName:t,columnType:n,newColumnName:r,comment:o,isNotNull:s,table:l}=e,E=s?"NOT NULL":"NULL";return new d(`ALTER TABLE ${l} ALTER COLUMN ${t} ${n} ${E};`).if(t!=r,()=>`EXEC sp_rename '${l}.${t}' , '${r}', 'COLUMN';`).toString()}showUsers(){return"SELECT name [user] from sys.database_principals where type='S'"}updateTable(e){const{database:t,table:n,newTableName:r}=e;return`sp_rename '${n}', '${r}'`}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE [',table_schema,'].[',TABLE_NAME, '];') trun FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'  AND TABLE_SCHEMA='${e}'`}createDatabase(e){return`create database ${e||"[name]"}`}showTableSource(e,t){return""}showViewSource(e,t){return`SELECT definition 'Create View' FROM sys.sql_modules WHERE object_id = OBJECT_ID('${e}.${t}');`}showProcedureSource(e,t){return`SELECT definition 'Create Procedure','${e}.${t}' "Procedure" FROM sys.sql_modules WHERE object_id = OBJECT_ID('${e}.${t}');`}showFunctionSource(e,t){return`SELECT definition 'Create Function','${e}.${t}' "Function" FROM sys.sql_modules WHERE object_id = OBJECT_ID('${e}.${t}');`}showTriggerSource(e,t){return`SELECT definition 'SQL Original Statement','${e}.${t}' "Trigger" FROM sys.sql_modules WHERE object_id = OBJECT_ID('${e}.${t}');`}showColumns(e,t){return["information_schema","sys"].includes(e==null?void 0:e.toLowerCase())?`SELECT
            name,
            type_name(system_type_id) "simpleType",
            concat(type_name(system_type_id) , '(' , max_length ,')') "type",
            is_nullable nullable,
            max_length "maxLength"
        FROM
            sys.all_columns
        WHERE
            object_id = OBJECT_ID('${e}.${t}') ;`:`SELECT c.COLUMN_NAME "name", DATA_TYPE "simpleType", iif(CHARACTER_MAXIMUM_LENGTH is not null,concat(DATA_TYPE , '(' , CHARACTER_MAXIMUM_LENGTH ,')'),DATA_TYPE) "type", IS_NULLABLE nullable, CHARACTER_MAXIMUM_LENGTH "maxLength", COLUMN_DEFAULT "defaultValue", '' "comment", tc.constraint_type "key",
        COLUMNPROPERTY(object_id('${e}.${t}'), c.COLUMN_NAME, 'IsIdentity') is_identity
        FROM
        INFORMATION_SCHEMA.COLUMNS c
        left join  INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE ccu
        on c.COLUMN_NAME=ccu.column_name and c.table_name=ccu.table_name and ccu.table_catalog=c.TABLE_CATALOG and ccu.TABLE_SCHEMA=c.TABLE_SCHEMA
        left join  INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
        on tc.constraint_name=ccu.constraint_name
        and tc.table_catalog=c.TABLE_CATALOG and tc.TABLE_SCHEMA=c.TABLE_SCHEMA and tc.table_name=c.table_name WHERE c.TABLE_SCHEMA = '${e}' AND c.table_name = '${t}' ORDER BY ORDINAL_POSITION`}showTriggers(e){return`SELECT t.name TRIGGER_NAME FROM SYS.OBJECTS t INNER JOIN sys.schemas s ON t.schema_id = s.schema_id WHERE TYPE = 'TR' and s.name='${e}'`}showProcedures(e){return`SELECT ROUTINE_NAME FROM INFORMATION_SCHEMA.ROUTINES WHERE SPECIFIC_SCHEMA = '${e}' and ROUTINE_TYPE='PROCEDURE' ORDER BY ROUTINE_NAME`}showFunctions(e){return`SELECT ROUTINE_NAME FROM INFORMATION_SCHEMA.ROUTINES WHERE SPECIFIC_SCHEMA = '${e}' and ROUTINE_TYPE='FUNCTION' ORDER BY ROUTINE_NAME`}showViews(e){return`SELECT name FROM sys.all_views t where SCHEMA_NAME(t.schema_id)='${e}' order by name`}buildPageSql(e,t,n){return`SELECT TOP ${n} * FROM ${e}.${t};`}countSql(e,t){return`SELECT count(*) count FROM ${e}.${t};`}showTables(e){return`SELECT TABLE_NAME 'name'
      FROM
        INFORMATION_SCHEMA.TABLES t
      WHERE
        TABLE_TYPE = 'BASE TABLE'
        AND TABLE_SCHEMA = '${e}' order by TABLE_NAME`}showDatabases(){return"SELECT name 'Database' FROM sys.databases"}showSchemas(){return"SELECT SCHEMA_NAME [schema] FROM INFORMATION_SCHEMA.SCHEMATA"}tableTemplate(){return`CREATE TABLE table_name$1(  
    id int NOT NULL primary key,
    create_time DATETIME,
    update_time DATETIME,
    content varchar(255)
);
EXECUTE sp_addextendedproperty N'MS_Description', '[table_comment]', N'user', N'dbo', N'table', N'[table_name]', NULL, NULL;
EXECUTE sp_addextendedproperty N'MS_Description', '[column_comment]', N'user', N'dbo', N'table', N'[table_name]', N'column', N'[column_name]';
`}viewTemplate(){return`CREATE VIEW dbo.view_name
AS
SELECT * FROM 
GO`}procedureTemplate(){return`CREATE PROCEDURE dbo.procedure_name
AS
BEGIN

END;`}triggerTemplate(){return`CREATE TRIGGER dbo.trigger_name
ON [table]
[INSTEAD OF/AFTER] [INSERT/UPDATE/DELETE]
AS
BEGIN

END;`}functionTemplate(){return`CREATE FUNCTION dbo.function_name() RETURNS [TYPE]
BEGIN
    return [value];
END;`}}class Q extends _{showVersion(){return"select @@version server_version;"}createIndex(e){let t=`${e.type||"key"}`;return t.match(/BTREE/i)&&(t="key"),`ALTER TABLE ${e.table} ADD ${t} (\`${e.column||"$1"}\`)`}dropIndex(e,t){return`ALTER TABLE ${e} DROP INDEX \`${t}\``}showIndex(e,t){return`SELECT column_name "column_name",index_name "index_name",index_type "index_type",non_unique=0 "isUnique" FROM INFORMATION_SCHEMA.STATISTICS WHERE table_schema='${e}' and table_name='${t}';`}variableList(){return"show global VARIABLES"}statusList(){return"show global status"}processList(){return"show processlist"}addColumn(e,t){const n=t?` AFTER \`${t}\``:"";return`ALTER TABLE ${e} 
    ADD COLUMN $1 [type]$2 COMMENT '$3'${n};`}createUser(){return`CREATE USER '$1'@'%' IDENTIFIED BY 'password$2';
-- Grant select privilege to all databases;
GRANT SELECT ON *.* TO '$1'@'%' WITH GRANT OPTION;
-- Grant all privileges to all databases;
GRANT ALL PRIVILEGES ON *.* TO '$1'@'%' WITH GRANT OPTION;`}updateUser(e){return`update mysql.user set 
    password = PASSWORD("newPassword")
    where User = '${e}';
FLUSH PRIVILEGES;
-- since mysql version 5.7, password column need change to authentication_string=PASSWORD("newPassword")`}updateColumn(e,t){var R;const{name:n,type:r,comment:o,nullable:s,defaultValue:l,extra:E,character_set_name:i,collation_name:c}=t,u=s!="YES";return new d(`ALTER TABLE ${e}`).append(`
	CHANGE ${n} ${n} ${r}`).if(i,`CHARACTER SET ${i}`).if(c,`COLLATE ${c}`).if(u,"NOT NULL").if((R=E==null?void 0:E.toLowerCase())==null?void 0:R.includes("auto_increment"),"AUTO_INCREMENT").if(o,`COMMENT '${o}'`).if(N(l)&&!u,"DEFAULT NULL").if(!N(l),`DEFAULT ${l=="CURRENT_TIMESTAMP"?l:`'${S(l)}'`}`).toString()}updateColumnSql(e){const{table:t,columnName:n,name:r,type:o,isNotNull:s,isAutoIncrement:l,comment:E,defaultValue:i,character_set_name:c,collation_name:u}=e;return new d(`ALTER TABLE \`${t}\``).append(`
	CHANGE \`${n}\` \`${r}\` ${o}`).if(c,`CHARACTER SET ${c}`).if(u,`COLLATE ${u}`).if(s,"NOT NULL").if(l,"AUTO_INCREMENT").if(E,`COMMENT '${E}'`).if(N(i)&&!s,"DEFAULT NULL").if(!N(i),`DEFAULT ${i=="CURRENT_TIMESTAMP"?i:`'${S(i)}'`}`).append(";").toString()}showUsers(){return"SELECT user user,host host FROM mysql.user;"}pingDataBase(e){return e?`use \`${e}\``:"select 1"}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:o}=e;let s="";return o&&o!=r&&(s=`ALTER TABLE \`${t}\` COMMENT = '${o}';`),n&&t!=n&&(s+=`ALTER TABLE \`${t}\` RENAME TO \`${n}\`;`),s}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE \`',table_schema,'\`.\`',TABLE_NAME, '\`;') trun FROM INFORMATION_SCHEMA.TABLES where  table_schema ='${e}' and TABLE_TYPE<>'VIEW';`}createDatabase(e){return`CREATE DATABASE $1
    DEFAULT CHARACTER SET = 'utf8mb4';`}showTableSource(e,t){return`SHOW CREATE TABLE \`${e}\`.\`${t}\`;`}showViewSource(e,t){return`SHOW CREATE VIEW  \`${e}\`.\`${t}\`;`}showProcedureSource(e,t){return`SHOW CREATE PROCEDURE \`${e}\`.\`${t}\`;`}showFunctionSource(e,t){return`SHOW CREATE FUNCTION \`${e}\`.\`${t}\`;`}showTriggerSource(e,t){return`SHOW CREATE TRIGGER \`${e}\`.\`${t}\`;`}showColumns(e,t,n){return n?`SELECT c.COLUMN_NAME name, c.DATA_TYPE simpleType,
            if(CHARACTER_MAXIMUM_LENGTH,CONCAT(DATA_TYPE,'(',CHARACTER_MAXIMUM_LENGTH,')'), DATA_TYPE) type,
            c.COLUMN_COMMENT comment, c.COLUMN_KEY \`key\`, c.IS_NULLABLE nullable, c.CHARACTER_MAXIMUM_LENGTH maxLength, c.COLUMN_DEFAULT defaultValue, c.EXTRA extra, c.COLLATION_NAME collation_name, c.CHARACTER_SET_NAME character_set_name,
            ik.REFERENCED_TABLE_NAME referenced_table_name, ik.REFERENCED_COLUMN_NAME referenced_column_name
        FROM information_schema.columns c
            left join information_schema.KEY_COLUMN_USAGE ik on c.table_schema = ik.TABLE_SCHEMA
            and c.table_name = ik.TABLE_NAME and c.COLUMN_NAME=ik.COLUMN_NAME
        WHERE c.table_schema = '${e}' AND c.table_name = '${t}'
        ORDER BY c.ORDINAL_POSITION;`:`SELECT COLUMN_NAME name,DATA_TYPE simpleType,
        if(CHARACTER_MAXIMUM_LENGTH,CONCAT(DATA_TYPE,'(',CHARACTER_MAXIMUM_LENGTH,')'), DATA_TYPE) type,
        COLUMN_COMMENT comment,COLUMN_KEY \`key\`,IS_NULLABLE nullable,CHARACTER_MAXIMUM_LENGTH maxLength,COLUMN_DEFAULT defaultValue,EXTRA extra,COLLATION_NAME collation_name,CHARACTER_SET_NAME character_set_name FROM information_schema.columns WHERE table_schema = '${e}' AND table_name = '${t}' ORDER BY ORDINAL_POSITION;`}showTriggers(e,t){const n=t?` AND EVENT_OBJECT_TABLE='${t}'`:"";return`SELECT TRIGGER_NAME FROM information_schema.TRIGGERS WHERE TRIGGER_SCHEMA = '${e}' ${n} ORDER BY TRIGGER_NAME;`}showProcedures(e){return`SELECT ROUTINE_NAME FROM information_schema.routines WHERE ROUTINE_SCHEMA = '${e}' and ROUTINE_TYPE='PROCEDURE' ORDER BY ROUTINE_NAME`}showFunctions(e){return`SELECT ROUTINE_NAME FROM information_schema.routines WHERE ROUTINE_SCHEMA = '${e}' and ROUTINE_TYPE='FUNCTION' ORDER BY ROUTINE_NAME`}showViews(e){return`SELECT TABLE_NAME name FROM information_schema.VIEWS  WHERE TABLE_SCHEMA = '${e}' ORDER BY TABLE_NAME`}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n};`}countSql(e,t){return`SELECT count(*) FROM ${t};`}showTables(e){return`SELECT TABLE_COMMENT "comment",TABLE_NAME "name",TABLE_ROWS "table_rows",AUTO_INCREMENT "auto_increment",
        row_format "row_format",DATA_LENGTH "data_length",INDEX_LENGTH "index_length",TABLE_COLLATION "collation"
        FROM information_schema.TABLES  WHERE TABLE_SCHEMA = '${e}' and TABLE_TYPE<>'VIEW' ORDER BY TABLE_NAME;`}showDatabases(){return"SELECT SCHEMA_NAME `Database`,DEFAULT_CHARACTER_SET_NAME `charset`,DEFAULT_COLLATION_NAME `collation` FROM information_schema.schemata ORDER BY `Database`;"}showSchemas(){return this.showDatabases()}tableTemplate(){return`CREATE TABLE $1(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME COMMENT 'Create Time',
    name$2 VARCHAR(255)
) COMMENT '$4';`}viewTemplate(){return`CREATE VIEW $1
AS
SELECT * FROM $2`}procedureTemplate(){return`CREATE PROCEDURE $1()
BEGIN

END;`}triggerTemplate(){return`CREATE TRIGGER $1
BEFORE INSERT ON table_name$2
FOR EACH ROW BEGIN
    $3
END;`}functionTemplate(){return`CREATE FUNCTION $1() RETURNS int$2
BEGIN
    $3
    return 0;
END;`}}class z extends _{showVersion(){return"call dbms.components() yield name, versions, edition unwind versions as server_version return server_version;"}updateColumn(e,t){throw new Error("Method not implemented.")}showDatabases(){return"SHOW DATABASES yield name AS Database"}showSchemas(){return this.showDatabases()}showTables(e){return"call db.labels() yield label as name RETURN name ORDER BY toLower(name)"}addColumn(e,t){return`MATCH (n:${e}) WHERE id(n) = 1 SET n.name = 'name' RETURN n`}showColumns(e,t){return`MATCH(n:\`${t}\`) UNWIND keys(n) AS name RETURN DISTINCT name`}showIndex(e,t){return`show indexes yield name as index_name, properties as column_name, type as index_type, labelsOrTypes where '${t}' in labelsOrTypes`}showViews(e){return"call db.relationshipTypes() yield relationshipType AS name RETURN name ORDER BY toLower(name)"}showUsers(){return"SHOW USERS"}createUser(){return`CREATE USER [name] IF NOT EXISTS 
    SET PASSWORD 'password';`}showTriggers(e){throw new Error("Method not implemented.")}showProcedures(e){throw new Error("Method not implemented.")}showFunctions(e){throw new Error("Method not implemented.")}buildPageSql(e,t,n){return`MATCH (n${t=="*"?"":`:${t}`}) RETURN n LIMIT ${n}`}countSql(e,t){return`MATCH (m:${t}) RETURN count(m) as count`}createDatabase(e){return"CREATE DATABASE $1"}truncateDatabase(e){throw new Error("Method not implemented.")}updateTable(e){throw new Error("Method not implemented.")}showTableSource(e,t){throw new Error("Method not implemented.")}showViewSource(e,t){throw new Error("Method not implemented.")}showProcedureSource(e,t){throw new Error("Method not implemented.")}showFunctionSource(e,t){throw new Error("Method not implemented.")}showTriggerSource(e,t){throw new Error("Method not implemented.")}tableTemplate(){return"CREATE (n:node {id:1}) return n;"}createIndex(e){return`CREATE INDEX FOR (n:${e.table}) ON (n.id)`}dropIndex(e,t){return`DROP INDEX \`${t}\``}viewTemplate(){return"MATCH (n1:node {id:1}), (n2:node {id:2}) CREATE (n1)-[r:TO]->(n2) RETURN type(r)"}procedureTemplate(){throw new Error("Method not implemented.")}triggerTemplate(){throw new Error("Method not implemented.")}functionTemplate(){throw new Error("Method not implemented.")}processList(){throw new Error("Method not implemented.")}variableList(){throw new Error("Method not implemented.")}statusList(){throw new Error("Method not implemented.")}}class B extends _{showVersion(){return"SHOW server_version;"}createIndex(e){var r;const t=(r=e.name)!=null?r:`${e.column||"[column]"}`,n=e.indexType||"btree";return`CREATE INDEX ${t}_${new Date().getTime()}_index ON 
    ${e.table} USING ${n} ("${e.column||"[column]"}");`}dropIndex(e,t){return`DROP INDEX "${t}"`}showIndex(e,t){return`select
    t.relname as table_name,
    i.relname as index_name,
    a.attname as column_name,
    ix.indisprimary "isPrimary",
    ix.indisunique "isUnique",
    CASE ix.indisprimary
        WHEN true THEN 'PRIMARY'
    ELSE CASE ix.indisunique
        WHEN true THEN 'UNIQUE'
        ELSE 'KEY'
    END
    END AS index_type
  from
    pg_class t
    join pg_catalog.pg_namespace pgn ON pgn.oid=t.relnamespace and pgn.nspname='${e}'
    join pg_index ix on t.oid = ix.indrelid
    join pg_attribute a on t.oid = a.attrelid and a.attnum = ANY(ix.indkey)
    join pg_class i on ix.indexrelid = i.oid
  where
     t.relkind = 'r'
    and t.relname = '${t}'
  order by
    ix.indisunique desc,i.relname;`}variableList(){return"SHOW ALL"}statusList(){return`SELECT
        'db_numbackends' AS db,
        pg_stat_get_db_numbackends(datid) AS status
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_xact_commit',
        pg_stat_get_db_xact_commit(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_xact_rollback',
        pg_stat_get_db_xact_rollback(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_blocks_fetched',
        pg_stat_get_db_blocks_fetched(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_blocks_hit',
        pg_stat_get_db_blocks_hit(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()`}processList(){return`SELECT
        a.pid AS "Id",
        a.usename AS "User",
        a.client_addr AS "Host",
        a.client_port AS "Port",
        datname AS "db",
        query AS "Command",
        l.mode AS "State",
        query_start AS "Time",
        CASE
          WHEN c.relname IS NOT NULL THEN 'Locked Object: ' || c.relname
          ELSE 'Locked Transaction: ' || l.virtualtransaction
        END AS "Info"
      FROM
        pg_stat_activity a
        LEFT JOIN pg_locks l ON a.pid = l.pid
        LEFT JOIN pg_class c ON l.relation = c.oid
      ORDER BY
        a.pid ASC,
        c.relname ASC`}addColumn(e,t){return`ALTER TABLE ${e} 
  ADD COLUMN [column] [type];
COMMENT ON COLUMN ${e}.[column] IS 'comment';`}createUser(){return`CREATE USER $1 WITH PASSWORD 'password$2';
-- Grant select privilege;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO $1;
-- Grant all privileges;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $1;`}updateUser(e){return`ALTER USER ${e} WITH PASSWORD 'new_password';`}updateColumn(e,t){const{name:n,type:r,comment:o,nullable:s,defaultValue:l}=t;return`-- change column type
ALTER TABLE ${e} 
    ALTER COLUMN ${n} TYPE ${r};
-- change column name
ALTER TABLE ${e} 
    RENAME COLUMN ${n} TO ${n};
-- Change column comment
COMMENT ON COLUMN ${e}.${n} IS '${o||"comment"}';`}updateColumnSql(e){const{table:t,columnName:n,newColumnName:r,columnType:o,isNotNull:s,isAutoIncrement:l,comment:E,defaultValue:i,oldRow:c}=e,u=i==null?void 0:i.match(/nextval/),R=l&&!c.isAutoIncrement&&!u,F=!l&&c.isAutoIncrement&&!u,D=!l&&c.isAutoIncrement&&u,x=s?"SET NOT NULL":"DROP NOT NULL";return new d(`ALTER TABLE "${t}" ALTER COLUMN "${n}" TYPE ${o};`,`
`).append(`ALTER TABLE "${t}" ALTER COLUMN "${n}" ${x};`).if(R,`ALTER TABLE "${t}" ALTER "${n}" ADD GENERATED ALWAYS AS IDENTITY;`).if(F,`ALTER TABLE "${t}" ALTER "${n}" DROP IDENTITY;`).if(D,`ALTER TABLE "${t}" ALTER COLUMN "${n}" DROP DEFAULT;`).if(!D&&i!=null,`ALTER TABLE "${t}" ALTER COLUMN "${n}" SET DEFAULT ${i!=null&&i.match(/(:|nextval)/i)?i:`'${i}'`};`).if(E&&E!=c.comment,`COMMENT ON COLUMN "${t}"."${n}" is '${E}';`).if(n!=r,`ALTER TABLE "${t}" RENAME COLUMN "${n}" TO "${r}";`).toString()}showUsers(){return'SELECT usename "user" from pg_user '}pingDataBase(e){return e?`set schema '${e}';`:"select 1"}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:o}=e;let s="";return o&&o!=r&&(s=`COMMENT ON TABLE "${t}" IS '${o}';`),n&&t!=n&&(s+=`ALTER TABLE "${t}" RENAME TO "${n}";`),s}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE "',TABLE_NAME, '";') trun FROM INFORMATION_SCHEMA.TABLES WHERE  table_schema ='${e}' AND table_type='BASE TABLE';`}createDatabase(e){return"CREATE DATABASE $1"}showTableSource(e,t){return""}showViewSource(e,t){return`SELECT CONCAT('CREATE VIEW ',table_name,'
AS
(',regexp_replace(view_definition,';$',''),')') "Create View",table_name,view_definition from information_schema.views where table_schema='${e}' and table_name='${t}'
        UNION ALL
        SELECT CONCAT('CREATE MATERIALIZED VIEW ',matviewname,'
AS
(',regexp_replace(definition,';$',''),')') "Create View",matviewname "table_name",'definition' "view_definition" from pg_matviews
        WHERE schemaname='${e}';`}showProcedureSource(e,t){return`select pg_get_functiondef('${e}.${t}' :: regproc) "Create Procedure",'${t}' "Procedure";`}showTriggerSource(e,t){return`select pg_get_triggerdef(oid) "SQL Original Statement",'${e}.${t}' "Trigger" from pg_trigger where tgname = '${t}';`}showColumns(e,t){return`SELECT c.COLUMN_NAME "name", 
          DATA_TYPE "simpleType", 
          case when (CHARACTER_MAXIMUM_LENGTH is not null) then DATA_TYPE || '(' || CHARACTER_MAXIMUM_LENGTH || ')' else DATA_TYPE end "type",
          IS_NULLABLE nullable, 
          CHARACTER_MAXIMUM_LENGTH "maxLength", 
          COLUMN_DEFAULT "defaultValue", 
          pg_catalog.col_description(pgc.oid, c.ordinal_position::int) AS "comment",
          tc.constraint_type "key",
          tc.constraint_name "constraint_name",
          cc.table_name "to_table",
          cc.column_name "to_column",
          pa.*
        FROM information_schema.columns c
        JOIN pg_catalog.pg_class pgc ON c.table_name = pgc.relname 
        JOIN pg_catalog.pg_namespace pgn ON pgn.oid=pgc.relnamespace and pgn.nspname=c.table_schema
        JOIN pg_attribute pa on pa.attname =c.column_name and pa.attrelid =pgc.oid 
        LEFT JOIN information_schema.key_column_usage ccu on c.COLUMN_NAME=ccu.column_name and c.table_name=ccu.table_name 
          and ccu.table_catalog=c.TABLE_CATALOG and c.table_schema=ccu.table_schema
        LEFT JOIN information_schema.table_constraints tc on tc.constraint_name=ccu.constraint_name and tc.table_schema=ccu.table_schema 
          and tc.table_catalog=c.TABLE_CATALOG and tc.table_name=c.table_name 
        LEFT JOIN information_schema.constraint_column_usage cc on cc.table_catalog=c.TABLE_CATALOG and  cc.constraint_name=tc.constraint_name and cc.table_schema=c.table_schema 
          and tc.constraint_type='FOREIGN KEY'
        WHERE c.TABLE_SCHEMA = '${e}' AND c.table_name = '${t}' 
        ORDER BY c.ORDINAL_POSITION;`}showTriggers(e,t){const n=t?` AND event_object_table='${t}'`:"";return`SELECT TRIGGER_NAME "TRIGGER_NAME" FROM information_schema.TRIGGERS WHERE trigger_schema = '${e}' ${n} ORDER BY TRIGGER_NAME ASC`}showProcedures(e){return`SELECT ROUTINE_NAME "ROUTINE_NAME",pg_get_functiondef(p.oid) source,p.oid FROM information_schema.routines r
    join pg_proc p on r.ROUTINE_NAME=p.proname JOIN pg_namespace n ON p.pronamespace = n.oid and n.nspname='${e}'
    WHERE r.ROUTINE_SCHEMA = '${e}' and r.ROUTINE_TYPE='PROCEDURE' ORDER BY r.ROUTINE_NAME ASC`}showFunctions(e){return`SELECT r.ROUTINE_NAME "ROUTINE_NAME",
    p.oid FROM information_schema.routines r
    join pg_proc p on r.ROUTINE_NAME=p.proname JOIN pg_namespace n ON p.pronamespace = n.oid and n.nspname='${e}'
    WHERE r.ROUTINE_SCHEMA = '${e}' and r.ROUTINE_TYPE='FUNCTION' ORDER BY r.ROUTINE_NAME ASC `}showFunctionSource(e,t,n){return n?`select pg_get_functiondef('${n}') "Create Function",'${t}' "Function";`:`select pg_get_functiondef('${e}.${t}' :: regproc) "Create Function",'${t}' "Function";`}showViews(e){return`SELECT * FROM (SELECT table_name "name",'simple' "type" from information_schema.tables where table_schema='${e}' and table_type='VIEW' 
UNION ALL
SELECT matviewname "name",'material' "type" from pg_matviews
WHERE schemaname='${e}') v order by v."name" ASC`}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n};`}countSql(e,t){return`SELECT count(*) FROM ${t};`}showTables(e){return`  SELECT t.table_name "name", pg_catalog.obj_description(pgc.oid, 'pg_class') "comment",pgc.reltuples "table_rows"
FROM information_schema.tables t
JOIN pg_catalog.pg_class pgc ON t.table_name = pgc.relname 
JOIN pg_catalog.pg_namespace pgn ON pgn.oid=pgc.relnamespace and pgn.nspname=t.table_schema
WHERE t.table_type='BASE TABLE'
AND t.table_schema='${e}' order by t.table_name;`}showDatabases(){return'SELECT datname "Database" FROM pg_database WHERE datistemplate = false order by datname ASC;'}showSchemas(){return'select schema_name "schema" from information_schema.schemata order by schema_name ASC;'}tableTemplate(){return`CREATE TABLE $1(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    create_time DATE,
    name$2 VARCHAR(255)
);
COMMENT ON TABLE $1 IS '$3';
COMMENT ON COLUMN $1.name$2 IS '$4';`}viewTemplate(){return`CREATE VIEW $1
AS
SELECT * FROM $2`}procedureTemplate(){return`CREATE PROCEDURE $1()
LANGUAGE SQL
as $$
[$2]
$$;`}triggerTemplate(){return`CREATE FUNCTION trigger_fun() RETURNS TRIGGER AS 
$body$
BEGIN
    RETURN [value];
END;
$body$ 
LANGUAGE plpgsql;

CREATE TRIGGER [name] 
[BEFORE/AFTER/INSTEAD OF] [INSERT/UPDATE/DELETE]
ON [table]
FOR EACH ROW
EXECUTE PROCEDURE [tri_fun]();`}dropTriggerTemplate(e){return`DROP TRIGGER ${e} on [table_name]`}functionTemplate(){return`CREATE FUNCTION $1() 
RETURNS int$2 AS $$
BEGIN
    $3
    return 0;
END;
$$ LANGUAGE plpgsql;`}}class Z extends B{showVersion(){return null}createIndex(e){throw new Error("Redshift not support index!")}dropIndex(e,t){return`DROP INDEX "${t}"`}showIndex(e,t){return`select
    t.relname as table_name,
    i.relname as index_name,
    a.attname as column_name,
    ix.indisprimary "isPrimary",
    ix.indisunique "isUnique",
    CASE ix.indisprimary
        WHEN true THEN 'PRIMARY'
    ELSE CASE ix.indisunique
        WHEN true THEN 'UNIQUE'
        ELSE 'KEY'
    END
    END AS index_type
  from
    pg_class t
    join pg_catalog.pg_namespace pgn ON pgn.oid=t.relnamespace and pgn.nspname='${e}'
    join pg_index ix on t.oid = ix.indrelid
    join pg_attribute a on t.oid = a.attrelid and a.attnum = ANY(string_to_array(textin(int2vectorout(ix.indkey)),' ')::int[])
    join pg_class i on ix.indexrelid = i.oid
  where
     t.relkind = 'r'
    and t.relname = '${t}'
  order by
    ix.indisunique desc,i.relname;`}variableList(){return"SHOW ALL"}statusList(){return`SELECT
        'db_numbackends' AS db,
        pg_stat_get_db_numbackends(datid) AS status
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_xact_commit',
        pg_stat_get_db_xact_commit(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_xact_rollback',
        pg_stat_get_db_xact_rollback(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_blocks_fetched',
        pg_stat_get_db_blocks_fetched(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_blocks_hit',
        pg_stat_get_db_blocks_hit(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()`}processList(){return`SELECT
        a.pid AS "Id",
        a.usename AS "User",
        a.client_addr AS "Host",
        a.client_port AS "Port",
        datname AS "db",
        query AS "Command",
        l.mode AS "State",
        query_start AS "Time",
        CASE
          WHEN c.relname IS NOT NULL THEN 'Locked Object: ' || c.relname
          ELSE 'Locked Transaction: ' || l.virtualtransaction
        END AS "Info"
      FROM
        pg_stat_activity a
        LEFT JOIN pg_locks l ON a.pid = l.pid
        LEFT JOIN pg_class c ON l.relation = c.oid
      ORDER BY
        a.pid ASC,
        c.relname ASC`}addColumn(e,t){return`ALTER TABLE ${e} 
  ADD COLUMN [column] [type];
COMMENT ON COLUMN ${e}.[column] IS 'comment';`}createUser(){return"CREATE USER [name] WITH PASSWORD 'password';"}updateUser(e){return`ALTER USER ${e} WITH PASSWORD 'new_password';`}updateColumn(e,t){const{name:n,type:r,comment:o,nullable:s,defaultValue:l}=t;return`-- change column type
ALTER TABLE ${e} 
    ALTER COLUMN ${n} TYPE ${r};
-- change column name
ALTER TABLE ${e} 
    RENAME COLUMN ${n} TO ${n};`}updateColumnSql(e){const{table:t,columnName:n,newColumnName:r,columnType:o,isNotNull:s,isAutoIncrement:l,comment:E,defaultValue:i}=e,c=o,u=s?"SET NOT NULL":"DROP NOT NULL";return new d(`ALTER TABLE "${t}" ALTER COLUMN "${n}" TYPE ${c};`,`
`).append(`ALTER TABLE "${t}" ALTER COLUMN "${n}" ${u};`).if(i!=null,`ALTER TABLE "${t}" ALTER COLUMN "${n}" SET DEFAULT ${i!=null&&i.match(/(:|nextval)/i)?i:`'${i}'`};`).if(E,`COMMENT ON COLUMN "${t}"."${n}" is '${E}';`).if(n!=r,`ALTER TABLE "${t}" RENAME COLUMN "${n}" TO "${r}";`).toString()}showUsers(){return'SELECT usename "user" from pg_user '}pingDataBase(e){return"select 1"}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:o}=e;let s="";return o&&o!=r&&(s=`COMMENT ON TABLE "${t}" IS '${o}';`),n&&t!=n&&(s+=`ALTER TABLE "${t}" RENAME TO "${n}";`),s}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE "',TABLE_NAME, '";') trun FROM INFORMATION_SCHEMA.TABLES WHERE  table_schema ='${e}' AND table_type='BASE TABLE';`}createDatabase(e){return"CREATE DATABASE $1"}showTableSource(e,t){return""}showViewSource(e,t){return`SELECT CONCAT('CREATE VIEW ',table_name,'
AS
(',regexp_replace(view_definition,';$',''),')') "Create View",table_name,view_definition from information_schema.views where table_schema='${e}' and table_name='${t}'
        UNION ALL
        SELECT CONCAT('CREATE MATERIALIZED VIEW ',matviewname,'
AS
(',regexp_replace(definition,';$',''),')') "Create View",matviewname "table_name",'definition' "view_definition" from pg_matviews
        WHERE schemaname='${e}';`}showProcedureSource(e,t){return`select pg_get_functiondef('${e}.${t}' :: regproc) "Create Procedure",'${t}' "Procedure";`}showFunctionSource(e,t){return`select pg_get_functiondef('${e}.${t}' :: regproc) "Create Function",'${t}' "Function";`}showTriggerSource(e,t){return`select pg_get_triggerdef(oid) "SQL Original Statement",'${e}.${t}' "Trigger" from pg_trigger where tgname = '${t}';`}showColumns(e,t){const n=t.split(".")[1];return`SELECT c.COLUMN_NAME "name", 
    DATA_TYPE "simpleType", 
    case when (CHARACTER_MAXIMUM_LENGTH is not null) then DATA_TYPE || '(' || CHARACTER_MAXIMUM_LENGTH || ')' else DATA_TYPE end "type",
    IS_NULLABLE nullable, 
    CHARACTER_MAXIMUM_LENGTH "maxLength", 
    COLUMN_DEFAULT "defaultValue", 
    pg_catalog.col_description(pgc.oid, c.ordinal_position::int) AS "comment",
    tc.constraint_type "key"
  FROM information_schema.columns c
  JOIN pg_catalog.pg_class pgc ON c.table_name = pgc.relname 
  JOIN pg_catalog.pg_namespace pgn ON pgn.oid=pgc.relnamespace and pgn.nspname=c.table_schema
  left join  information_schema.constraint_column_usage ccu on c.COLUMN_NAME=ccu.column_name and c.table_name=ccu.table_name and ccu.table_catalog=c.TABLE_CATALOG and c.table_schema=ccu.table_schema
  left join  information_schema.table_constraints tc on tc.constraint_name=ccu.constraint_name and tc.table_schema=ccu.table_schema 
    and tc.table_catalog=c.TABLE_CATALOG and tc.table_name=c.table_name WHERE c.TABLE_SCHEMA = '${e}' AND c.table_name = '${n||t}' 
  ORDER BY ORDINAL_POSITION;`}showTriggers(e,t){const n=t?` AND event_object_table='${t}'`:"";return`SELECT TRIGGER_NAME "TRIGGER_NAME" FROM information_schema.TRIGGERS WHERE trigger_schema = '${e}' ${n} ORDER BY TRIGGER_NAME ASC`}showProcedures(e){return`SELECT ROUTINE_NAME "ROUTINE_NAME" FROM information_schema.routines WHERE ROUTINE_SCHEMA = '${e}' and ROUTINE_TYPE='PROCEDURE' ORDER BY ROUTINE_NAME ASC`}showFunctions(e){return`SELECT ROUTINE_NAME "ROUTINE_NAME" FROM information_schema.routines WHERE ROUTINE_SCHEMA = '${e}' and ROUTINE_TYPE='FUNCTION' ORDER BY ROUTINE_NAME ASC `}showViews(e){return`SELECT * FROM (SELECT table_name "name",'simple' "type" from information_schema.tables where table_schema='${e}' and table_type='VIEW') v order by v."name" ASC`}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n};`}countSql(e,t){return`SELECT count(*) FROM ${t};`}showTables(e){return`  SELECT t.table_name "name", pg_catalog.obj_description(pgc.oid, 'pg_class') "comment"
FROM information_schema.tables t
JOIN pg_catalog.pg_class pgc ON t.table_name = pgc.relname 
JOIN pg_catalog.pg_namespace pgn ON pgn.oid=pgc.relnamespace and pgn.nspname=t.table_schema
WHERE t.table_type='BASE TABLE'
AND t.table_schema='${e}' order by t.table_name;`}showDatabases(){return'SELECT datname "Database" FROM pg_database WHERE datistemplate = false order by datname ASC;'}showSchemas(){return'SELECT nspname "schema" from pg_catalog.pg_namespace order by nspname ASC;'}tableTemplate(){return`CREATE TABLE table_name(  
    id INT identity(1, 1) NOT NULL PRIMARY KEY,
    create_time DATE,
    update_time DATE,
    content VARCHAR(255)
);
COMMENT ON TABLE table_name IS 'table_comment';
COMMENT ON COLUMN table_name.content IS 'content';`}viewTemplate(){return`CREATE VIEW view_name
AS
SELECT * FROM `}procedureTemplate(){return`CREATE PROCEDURE procedure_name()
as $$
begin
    SELECT 1;
END;
$$ LANGUAGE plpgsql;`}triggerTemplate(){return`CREATE FUNCTION tri_fun() RETURNS TRIGGER AS 
$body$
BEGIN
    RETURN [value];
END;
$body$ 
LANGUAGE plpgsql;

CREATE TRIGGER [name] 
[BEFORE/AFTER/INSTEAD OF] [INSERT/UPDATE/DELETE]
ON [table]
FOR EACH ROW
EXECUTE PROCEDURE [tri_fun]();`}dropTriggerTemplate(e){return`DROP TRIGGER ${e} on [table_name]`}functionTemplate(){return`CREATE FUNCTION function_name() 
RETURNS int STABLE
AS $$
    SELECT 1
$$ LANGUAGE sql;`}}class ee extends _{updateColumn(e,t){throw new Error("SQLite not support update column.")}updateColumnSql(e){throw new Error("SQLite not support update column.")}createIndex(e){const{table:t,column:n="$2"}=e;return`CREATE INDEX ${`${t}_${n}`} ON ${t}(${n});`}showIndex(e,t){return`SELECT name index_name FROM sqlite_master WHERE type='index' and tbl_name='${t}' `}dropIndex(e,t){return`DROP INDEX ${t};`}showSchemas(){throw new Error("Method not implemented.")}showTables(e){return`SELECT name, type FROM sqlite_master WHERE type="table" AND name <> 'sqlite_sequence' AND name <> 'sqlite_stat1' ORDER BY type ASC, name ASC;`}addColumn(e,t){return`ALTER TABLE ${e} 
    ADD COLUMN $1 [type$2];`}showColumns(e,t){return`SELECT t1.*,t2.'table' 'to_table',t2.'to' 'to_column' FROM PRAGMA_TABLE_INFO('${t}') t1
        left join (
            SELECT * FROM  pragma_foreign_key_list('${t}')
        ) t2  on t1.name=t2.'from';`}showViews(e){return`SELECT name, type FROM sqlite_master WHERE type="view" AND name <> 'sqlite_sequence' AND name <> 'sqlite_stat1' ORDER BY type ASC, name ASC;`}showUsers(){throw new Error("Method not implemented.")}createUser(){throw new Error("Method not implemented.")}showTriggers(e){throw new Error("Method not implemented.")}showProcedures(e){throw new Error("Method not implemented.")}showFunctions(e){throw new Error("Method not implemented.")}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n};`}countSql(e,t){throw new Error("Method not implemented.")}createDatabase(e){throw new Error("Method not implemented.")}truncateDatabase(e){throw new Error("Method not implemented.")}updateTable(e){throw new Error("Method not implemented.")}showTableSource(e,t){return`SELECT sql "Create Table" FROM sqlite_master where name='${t}' and type='table';`}showViewSource(e,t){return`SELECT sql "Create View" FROM sqlite_master where name='${t}' and type='view';`}showProcedureSource(e,t){throw new Error("Method not implemented.")}showFunctionSource(e,t){throw new Error("Method not implemented.")}showTriggerSource(e,t){throw new Error("Method not implemented.")}tableTemplate(){return`CREATE TABLE table_name(  
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    content TEXT
);`}viewTemplate(){return`CREATE VIEW $1
AS
SELECT * FROM $2`}procedureTemplate(){throw new Error("Method not implemented.")}triggerTemplate(){throw new Error("Method not implemented.")}functionTemplate(){throw new Error("Method not implemented.")}processList(){throw new Error("Method not implemented.")}variableList(){throw new Error("Method not implemented.")}statusList(){throw new Error("Method not implemented.")}}function te(a){switch(a||(a=m.MYSQL),a){case null:case m.MYSQL:return new Q;case m.MARIA_DB:return new X;case m.MSSQL:return new J;case m.SQLITE:return new ee;case m.REDSHIFT:return new Z;case m.PG:return new B;case m.CLICKHOUSE:return new k;case m.DM:return new q;case m.ORACLE:return new y;case m.ES:return new j;case m.MONGO_DB:return new K;case m.NEO4J:return new z}return new V}class b{constructor(e){I(this,"dialect");this.meta=e,this.dialect=te(e.dbType)}updateTable(e){return this.dialect.updateTable(e)}columnTypes(){return[]}newColumn(e,t){return`ALTER TABLE ${A(this.meta.table,this.meta.dbType)} ADD COLUMN ${A(e,this.meta.dbType)} ${t}`}updateColumn(e){return this.dialect.updateColumnSql({...e,table:this.meta.table})}dropColumn(e){return`ALTER TABLE ${A(this.meta.table,this.meta.dbType)} DROP COLUMN ${A(e,this.meta.dbType)}`}formatIndexType(e){return e.index_type}indexTypes(){return[{label:"INDEX",value:"INDEX"},{label:"UNIQUE",value:"UNIQUE"}]}dropIndex(e){return this.dialect.dropIndex(A(this.meta.table,this.meta.dbType),e)}showForeignKeys(){return`SELECT
c.COLUMN_NAME column_name, ik.CONSTRAINT_NAME constraint_name,
ik.REFERENCED_TABLE_NAME referenced_table, ik.REFERENCED_COLUMN_NAME referenced_column
FROM
information_schema.columns c join information_schema.KEY_COLUMN_USAGE ik on c.table_schema = ik.TABLE_SCHEMA
and c.table_name = ik.TABLE_NAME and c.COLUMN_NAME = ik.COLUMN_NAME
WHERE ik.REFERENCED_TABLE_NAME is not null and c.table_schema = '${this.meta.schema}' and c.table_name = '${this.meta.table}' ORDER BY ik.CONSTRAINT_NAME;`}newForeignKey(e){const{column:t,refTable:n,refColumn:r}=e;return`ALTER TABLE "${this.meta.table}" ADD FOREIGN KEY ("${t}") REFERENCES "${n}"("${r}");`}dropForignKey(e){return`ALTER TABLE "${this.meta.table}" DROP FOREIGN KEY ${e};`}}class ne extends b{newIndex(e){const{column:t}=e;return`ALTER TABLE "${this.meta.table}" ADD INDEX ${t}_${new Date().getTime()}_index expression TYPE type GRANULARITY value AFTER "${t}"`}}class ae extends b{newColumn(e,t){return`ALTER TABLE ${A(this.meta.table,this.meta.dbType)} ADD ${A(e,this.meta.dbType)} ${t}`}newIndex(e){const{table:t=this.meta.table,column:n}=e;return`CREATE INDEX ${`${t}_${n}`} ON "${t}"("${n}");`}dropForignKey(e){return`ALTER TABLE "${this.meta.table}" DROP CONSTRAINT ${e};`}showForeignKeys(){return`SELECT
        obj.name AS "constraint_name",
        col1.name AS "column_name",
        tab2.name AS "referenced_table",
        col2.name AS "referenced_column"
    FROM
        sys.foreign_key_columns fkc
        JOIN sys.objects obj ON obj.object_id = fkc.constraint_object_id
        JOIN sys.tables tab1 ON tab1.object_id = fkc.parent_object_id
        and tab1.name='${this.meta.table}'
        JOIN sys.schemas sch ON tab1.schema_id = sch.schema_id
        and sch.name='${this.meta.schema}'
        JOIN sys.columns col1 ON col1.column_id = parent_column_id
        AND col1.object_id = tab1.object_id
        JOIN sys.tables tab2 ON tab2.object_id = fkc.referenced_object_id
        JOIN sys.columns col2 ON col2.column_id = referenced_column_id
        AND col2.object_id = tab2.object_id;`}}class re extends b{indexTypes(){return[{label:"INDEX",value:"INDEX"},{label:"UNIQUE",value:"UNIQUE"},{label:"FULLTEXT",value:"FULLTEXT"}]}formatIndexType(e){const t=e.index_type.toUpperCase();return console.log(t),t=="BTREE"?e.index_name=="PRIMARY"?"PRIMARY":e.isUnique?"UNIQUE":"KEY":t}newIndex(e){const t=e.type||"key";return`ALTER TABLE \`${this.meta.table}\` ADD ${t} (\`${e.column}\`)`}newForeignKey(e){const{column:t,refTable:n,refColumn:r}=e;return`ALTER TABLE \`${this.meta.table}\` ADD FOREIGN KEY (\`${t}\`) REFERENCES \`${n}\`(\`${r}\`);`}dropForignKey(e){return`ALTER TABLE \`${this.meta.table}\` DROP FOREIGN KEY ${e};`}}class oe extends b{newIndex(e){const{table:t=this.meta.table,column:n}=e;return`CREATE INDEX ${`${t}_${n}`} ON "${t}"("${n}")`}newColumn(e,t){return`ALTER TABLE ${A(this.meta.table,this.meta.dbType)} ADD ${e} ${t}`}newForeignKey(e){const{column:t,refTable:n,refColumn:r}=e,o=`${t}_${n}_${r}_fk_${Math.floor(Math.random()*30)}`;return`ALTER TABLE "${this.meta.table}" ADD CONSTRAINT ${o} FOREIGN KEY ("${t}") REFERENCES ${n}(${r});`}dropForignKey(e){return`ALTER TABLE "${this.meta.table}" DROP CONSTRAINT ${e};`}showForeignKeys(){return`select
        b.CONSTRAINT_NAME "constraint_name",
        a.COLUMN_NAME "column_name",
        c_pk.table_name "referenced_table",
        b_pk.COLUMN_NAME "referenced_column"
    from all_tab_columns a
        join ALL_CONS_COLUMNS b on a.COLUMN_NAME = b.COLUMN_NAME and a.OWNER = b.OWNER and a.table_name = b.table_name
        join ALL_CONSTRAINTS c on b.CONSTRAINT_NAME = c.CONSTRAINT_NAME
        JOIN all_constraints c_pk ON c.r_owner = c_pk.owner AND c.r_constraint_name = c_pk.constraint_name
        join ALL_CONS_COLUMNS b_pk on b_pk.CONSTRAINT_NAME = c_pk.CONSTRAINT_NAME
    where
        a.owner = '${this.meta.schema}'
        and a.table_name = '${this.meta.table}'
        and c.CONSTRAINT_TYPE = 'R';`}}class se extends b{newIndex(e){const{table:t=this.meta.table,column:n,type:r,indexType:o="btree"}=e;return`CREATE ${r=="UNIQUE"?"UNIQUE":""} INDEX ${n}_${new Date().getTime()}_index ON "${t}" USING ${o} ("${n}");`}dropForignKey(e){return`ALTER TABLE "${this.meta.table}" DROP CONSTRAINT ${e};`}showForeignKeys(){return`SELECT
      refc.constraint_name constraint_name,
      STRING_AGG(distinct kcu.column_name, ',') AS column_name,
      ccu.table_name AS referenced_table,
      STRING_AGG(distinct ccu.column_name, ',') AS referenced_column,
      STRING_AGG(
          distinct kcu.ordinal_position :: text,
          ','
      ) AS ord_position,
      refc.update_rule,
      refc.delete_rule
  FROM
      information_schema.referential_constraints AS refc,
      information_schema.key_column_usage AS kcu,
      information_schema.constraint_column_usage AS ccu
  WHERE
      refc.constraint_schema = '${this.meta.schema}'
      AND refc.constraint_name = kcu.constraint_name
      AND refc.constraint_schema = kcu.table_schema
      AND ccu.constraint_name = refc.constraint_name
      AND kcu.table_name = '${this.meta.table}'
  GROUP BY
      refc.constraint_name,
      refc.update_rule,
      refc.delete_rule,
      kcu.table_name,
      ccu.table_schema,
      ccu.table_name
  ORDER BY ord_position;`}}class ie extends b{newIndex(e){const{table:t=this.meta.table,column:n}=e;return`CREATE INDEX ${`${t}_${n}`} ON "${t}"("${n}");`}showForeignKeys(){return`SELECT "from" column_name, "table" referenced_table, "to" referenced_column,
        on_update, on_delete 
        FROM pragma_foreign_key_list('${this.meta.table}');`}}function w(a){switch(a.dbType){case m.PG:case m.REDSHIFT:return new se(a);case m.DM:case m.ORACLE:return new oe(a);case m.MSSQL:return new ae(a);case m.CLICKHOUSE:return new ne(a);case m.SQLITE:return new ie(a);default:return new re(a)}}const le={mixins:[C],props:["remainHeight"],components:{UxGrid:p.UxGrid,UxTableColumn:p.UxTableColumn},data(){return{indexes:[],indexTypes:[],dbType:null,columns:[],dialect:null,loading:!0,index:{visible:!1,loading:!1,column:null,type:null}}},mounted(){this.on("designMeta",a=>{const{columns:e,dbType:t}=a;this.columns=e,this.dbType=t,this.dialect=w(a),this.indexTypes=this.dialect.indexTypes(),this.loadIndexes()}).on("indexes",a=>{this.indexes=a,this.loading=!1}).on("success",()=>{this.index.loading=!1,this.index.visible=!1,this.init()}).on("error",a=>{this.index.loading=!1,h(a)}).init()},methods:{loadIndexes(){this.emit("indexes"),this.loading=!0},openIndexDialog(){this.index={visible:!0,loading:!1,column:null,type:null}},getIndexType(a){return this.dialect.formatIndexType(a)},formatUnique(a){var e;return!(!a||((e=a==null?void 0:a.toUpperCase)==null?void 0:e.call(a))=="NO"||a=="0")},doCreate(){this.index.loading=!0,this.emit("execute",{type:"index",sql:this.dialect.newIndex({column:this.index.column,type:this.index.type,indexType:this.index.indexType})})},deleteConfirm(a){this.$confirm(this.$t("design.deleteFkConfirm"),"Warning",{confirmButtonText:this.$t("common.ok"),cancelButtonText:this.$t("common.cancel"),type:"warning"}).then(()=>{this.emit("execute",{type:"index",sql:this.dialect.dropIndex(a.index_name)})})}}};var Ee=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"design-toolbar"},[["ClickHouse"].includes(e.dbType)?e._e():t("vsc-button",{attrs:{type:"icon",icon:"codicon codicon-add text-base",title:e.$t("common.new")},on:{click:e.openIndexDialog}}),t("vsc-button",{attrs:{type:"icon",icon:"codicon codicon-refresh text-base",title:e.$t("common.refresh")},on:{click:e.loadIndexes}})],1),t("ux-grid",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.indexes,stripe:"",height:e.remainHeight}},[t("ux-table-column",{attrs:{align:"center",field:"index_name",title:e.$t("design.indexName"),"show-overflow-tooltip":"true"}}),t("ux-table-column",{attrs:{align:"center",field:"column_name",title:e.$t("design.column"),"show-overflow-tooltip":"true"}}),t("ux-table-column",{attrs:{align:"center",field:"isUnique",title:e.$t("design.unique"),"show-overflow-tooltip":"true"},scopedSlots:e._u([{key:"default",fn:function({row:n}){return[t(O,{attrs:{disabled:"",value:e.formatUnique(n.isUnique)}})]}}])}),t("ux-table-column",{attrs:{align:"center",field:"index_type",title:e.$t("common.type"),"show-overflow-tooltip":"true"},scopedSlots:e._u([{key:"default",fn:function({row:n}){return[e._v(" "+e._s(e.getIndexType(n))+" ")]}}])}),["ClickHouse"].includes(e.dbType)?e._e():t("ux-table-column",{attrs:{title:e.$t("design.operation"),width:"120"},scopedSlots:e._u([{key:"default",fn:function({row:n}){return[t("div",{staticClass:"text-center"},[t("vsc-button",{attrs:{type:"icon",icon:"codicon codicon-remove text-base",title:"delete"},on:{click:function(r){return e.deleteConfirm(n)}}})],1)]}}],null,!1,3126389779)})],1),t($,{attrs:{title:e.$t("design.newIndex"),visible:e.index.visible,top:"3vh",closeOnClickModal:!1,center:""},on:{"update:visible":function(n){return e.$set(e.index,"visible",n)}}},[t(M,{attrs:{inline:!0}},[t(T,{attrs:{label:e.$t("design.column")}},[t(g,{attrs:{size:"mini"},model:{value:e.index.column,callback:function(n){e.$set(e.index,"column",n)},expression:"index.column"}},e._l(e.columns,function(n){return t(f,{key:n.name,attrs:{label:n.name,value:n.name}})}),1)],1),t(T,{attrs:{label:e.$t("common.type")}},[t(g,{attrs:{size:"mini"},model:{value:e.index.type,callback:function(n){e.$set(e.index,"type",n)},expression:"index.type"}},e._l(e.indexTypes,function(n,r){return t(f,{key:r,attrs:{label:n.label,value:n.value}})}),1)],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("vsc-button",{attrs:{type:"secondary"},on:{click:function(n){e.index.visible=!1}}},[e._v(e._s(e.$t("common.cancel")))]),t("vsc-button",{attrs:{type:"primary",loading:e.index.loading},on:{click:e.doCreate}},[e._v(e._s(e.$t("common.ok")))])],1)],1)],1)},ce=[],me=L(le,Ee,ce,!1,null,null,null,null);const ue=me.exports;const Te={mixins:[C],components:{codemirror:G.codemirror},data(){return{loading:!1,ddl:"",user:null,cmOptions:{tabSize:4,mode:"text/x-mysql",theme:"base16-dark",lineNumbers:!1,line:!0}}},computed:{codemirror(){return this.$refs.cmEditor.codemirror},isPay(){var a;return((a=this.user)==null?void 0:a.expireTime)>new Date().getTime()}},mounted(){this.on("ddl",({ddl:a,dbType:e})=>{W(this.codemirror,e),this.loading=!1,this.ddl=a}).on("user",a=>{this.user=a,this.isPay&&(this.emit("ddl"),this.loading=!0)}).emit("user")}};var de=function(){var e=this,t=e._self._c;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{"padding-left":"20px"}},[t("codemirror",{directives:[{name:"show",rawName:"v-show",value:e.isPay,expression:"isPay"}],ref:"cmEditor",attrs:{value:e.ddl,options:e.cmOptions}}),e.isPay?e._e():t("span",[e._v(" Only premium users can display DDL. ")])],1)},_e=[],Ae=L(Te,de,_e,!1,null,null,null,null);const Ne=Ae.exports,Re={mixins:[C],props:["remainHeight"],components:{UxGrid:p.UxGrid,UxTableColumn:p.UxTableColumn},data(){return{foreignKeys:[],dbType:null,columns:[],dialect:null,loading:!0,status:{visible:!1,loading:!1},editModel:{column:null,refTable:null,refColumn:null}}},mounted(){this.on("designMeta",a=>{const{columns:e,dbType:t}=a;this.columns=e,this.dbType=t,this.dialect=w(a),this.loadForeignKeys()}).on("foreignKeys",a=>{this.loading=!1,this.foreignKeys=a}).on("success",()=>{this.status.loading=!1,this.status.visible=!1,this.init()}).on("error",a=>{this.status.loading=!1,h(a)}).init()},methods:{loadForeignKeys(){this.loading=!0,this.emit("foreignKeys",this.dialect.showForeignKeys())},openFkDialog(){this.status={visible:!0,loading:!1},this.editModel={column:null,refTable:null,refColumn:null}},doCreate(){this.status.loading=!0,this.emit("execute",{type:"column",sql:this.dialect.newForeignKey(this.editModel)})},deleteConfirm(a){this.$confirm(this.$t("design.deleteFkConfirm"),"Warning",{confirmButtonText:this.$t("common.ok"),cancelButtonText:this.$t("common.cancel"),type:"warning"}).then(()=>{this.emit("execute",{type:"column",sql:this.dialect.dropForignKey(a.constraint_name)})})}}};var pe=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"design-toolbar"},[["SQLite"].includes(e.dbType)?e._e():t("vsc-button",{attrs:{type:"icon",icon:"codicon codicon-add text-base",title:e.$t("common.new")},on:{click:e.openFkDialog}}),t("vsc-button",{attrs:{type:"icon",icon:"codicon codicon-refresh text-base",title:e.$t("common.refresh")},on:{click:e.loadForeignKeys}})],1),t("ux-grid",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.foreignKeys,stripe:"",height:e.remainHeight}},[["SQLite"].includes(e.dbType)?e._e():t("ux-table-column",{attrs:{align:"center",field:"constraint_name",title:e.$t("design.constraintName"),"show-overflow-tooltip":"true"}}),t("ux-table-column",{attrs:{align:"center",field:"column_name",title:e.$t("design.column"),"show-overflow-tooltip":"true"}}),t("ux-table-column",{attrs:{align:"center",field:"referenced_table",title:e.$t("design.referencedTable"),"show-overflow-tooltip":"true"}}),t("ux-table-column",{attrs:{align:"center",field:"referenced_column",title:e.$t("design.referencedColumn"),"show-overflow-tooltip":"true"}}),["SQLite"].includes(e.dbType)?e._e():t("ux-table-column",{attrs:{title:e.$t("design.operation"),width:"120"},scopedSlots:e._u([{key:"default",fn:function({row:n}){return[t("div",{staticClass:"text-center"},[t("vsc-button",{attrs:{type:"icon",icon:"codicon codicon-remove text-base",title:"delete"},on:{click:function(r){return e.deleteConfirm(n)}}})],1)]}}],null,!1,3126389779)})],1),t($,{attrs:{title:e.$t("design.newForeignKey"),visible:e.status.visible,top:"3vh",width:"420px",closeOnClickModal:!1,center:""},on:{"update:visible":function(n){return e.$set(e.status,"visible",n)}}},[t(M,{attrs:{inline:!0,"label-width":"150px","label-position":"left"}},[t(T,{attrs:{label:e.$t("design.column")}},[t(g,{attrs:{size:"mini"},model:{value:e.editModel.column,callback:function(n){e.$set(e.editModel,"column",n)},expression:"editModel.column"}},e._l(e.columns,function(n){return t(f,{key:n.name,attrs:{label:n.name,value:n.name}})}),1)],1),t("br"),t(T,{attrs:{label:e.$t("design.referencedTable")}},[t("vsc-input",{attrs:{size:"mini"},model:{value:e.editModel.refTable,callback:function(n){e.$set(e.editModel,"refTable",n)},expression:"editModel.refTable"}})],1),t(T,{attrs:{label:e.$t("design.referencedColumn")}},[t("vsc-input",{attrs:{size:"mini"},model:{value:e.editModel.refColumn,callback:function(n){e.$set(e.editModel,"refColumn",n)},expression:"editModel.refColumn"}})],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("vsc-button",{attrs:{type:"secondary"},on:{click:function(n){e.status.visible=!1}}},[e._v(e._s(e.$t("common.cancel")))]),t("vsc-button",{attrs:{type:"primary",loading:e.status.loading},on:{click:e.doCreate}},[e._v(e._s(e.$t("common.ok")))])],1)],1)],1)},Ce=[],Le=L(Re,pe,Ce,!1,null,null,null,null);const be=Le.exports,Oe={mixins:[C],props:["remainHeight"],components:{UxGrid:p.UxGrid,UxTableColumn:p.UxTableColumn},data(){return{table:null,dbType:null,columnLoading:!0,columns:[],copyedColumns:[],dialect:null,editColumn:{},column:{visible:!1,editVisible:!1,loading:!1,editLoading:!1,column:null,type:null,nullable:!1}}},mounted(){this.on("designMeta",a=>{this.columns=a.columns,this.copyedColumns=U.clone(a.columns),this.dbType=a.dbType,this.columnLoading=!1,this.dialect=w(a)}).on("columns",a=>{this.columns=a,this.copyedColumns=U.clone(a),this.columnLoading=!1}).on("success",()=>{this.column.loading=!1,this.column.visible=!1,this.column.editLoading=!1,this.column.editVisible=!1,this.init()}).on("error",a=>{this.column.loading=!1,this.column.editLoading=!1,h(a),this.init()}).init()},computed:{supportChangeIncrement(){return[m.MYSQL,m.MARIA_DB,m.PG].includes(this.dbType)}},methods:{loadColumns(){this.emit("columns"),this.columnLoading=!0},newColumn(){this.column.visible=!0},changeColumn(a,e){this.editColumn={...a,columnName:a.name,oldRow:this.copyedColumns[e]},this.updateColumn()},updateColumn(){this.column.editLoading=!0;try{this.emit("execute",{type:"column",sql:this.dialect.updateColumn({table:this.table,newColumnName:this.editColumn.name,columnType:this.editColumn.type,nullable:!this.editColumn.isNotNull,...this.editColumn,type:Y(this.editColumn)})})}catch(a){h(a.message)}},doCreate(){this.column.loading=!0,this.emit("execute",{type:"column",sql:this.dialect.newColumn(this.column.name,this.column.type)})},openEdit(a){this.editColumn={...a,columnName:a.name,oldRow:a},this.column.editVisible=!0,this.column.editLoading=!1},deleteConfirm(a){this.$confirm(this.$t("design.deleteColumnConfirm"),"Warning",{confirmButtonText:this.$t("common.ok"),cancelButtonText:this.$t("common.cancel"),type:"warning"}).then(()=>{this.emit("execute",{type:"column",sql:this.dialect.dropColumn(a.name)})})}}};var he=function(){var e=this,t=e._self._c;return t("div",[t("div",{ref:"infoPanel",staticClass:"design-toolbar"},[t("vsc-button",{attrs:{type:"icon",icon:"codicon codicon-add text-base",title:e.$t("common.new")},on:{click:e.newColumn}}),t("vsc-button",{attrs:{type:"icon",icon:"codicon codicon-refresh text-base",title:e.$t("common.refresh")},on:{click:e.loadColumns}})],1),t("ux-grid",{directives:[{name:"loading",rawName:"v-loading",value:e.columnLoading,expression:"columnLoading"}],staticStyle:{width:"100%"},attrs:{data:e.columns,stripe:"",height:e.remainHeight}},[t("ux-table-column",{attrs:{align:"center",field:"name",title:e.$t("common.name"),width:"200","show-overflow-tooltip":"true"}}),t("ux-table-column",{attrs:{align:"center",field:"type",title:e.$t("common.type"),width:"140","show-overflow-tooltip":"true"}}),t("ux-table-column",{attrs:{align:"center",field:"comment",title:e.$t("common.comment"),width:"200","show-overflow-tooltip":"true"},scopedSlots:e._u([{key:"default",fn:function({row:n}){return[t("span",{attrs:{title:n.comment}},[e._v(" "+e._s(n.comment)+" ")])]}}])}),t("ux-table-column",{attrs:{align:"center",field:"maxLength",width:"80",title:e.$t("design.length"),"show-overflow-tooltip":"true"}}),t("ux-table-column",{attrs:{align:"center",field:"defaultValue",width:"120",title:e.$t("common.default"),"show-overflow-tooltip":"true"}}),t("ux-table-column",{attrs:{align:"center",title:e.$t("design.isPrimary"),width:"100","show-overflow-tooltip":"true"},scopedSlots:e._u([{key:"default",fn:function({row:n}){return[t(O,{attrs:{disabled:"",value:n.isPrimary}})]}}])}),t("ux-table-column",{attrs:{align:"center",title:e.$t("design.isUnique"),width:"80","show-overflow-tooltip":"true"},scopedSlots:e._u([{key:"default",fn:function({row:n}){return[t(O,{attrs:{disabled:"",value:n.isUnique}})]}}])}),t("ux-table-column",{attrs:{align:"center",title:e.$t("design.isNotNull"),width:"80","show-overflow-tooltip":"true"},scopedSlots:e._u([{key:"default",fn:function({row:n,rowIndex:r}){return[t(O,{on:{change:function(o){return e.changeColumn(n,r)}},model:{value:n.isNotNull,callback:function(o){e.$set(n,"isNotNull",o)},expression:"row.isNotNull"}})]}}])}),t("ux-table-column",{attrs:{align:"center",title:e.$t("design.isAutoIncrement"),width:"140","show-overflow-tooltip":"true"},scopedSlots:e._u([{key:"default",fn:function({row:n,rowIndex:r}){return[t(O,{attrs:{disabled:!e.supportChangeIncrement},on:{change:function(o){return e.changeColumn(n,r)}},model:{value:n.isAutoIncrement,callback:function(o){e.$set(n,"isAutoIncrement",o)},expression:"row.isAutoIncrement"}})]}}])}),["SQLite"].includes(e.dbType)?e._e():t("ux-table-column",{attrs:{title:e.$t("design.operation"),width:"120"},scopedSlots:e._u([{key:"default",fn:function({row:n,rowIndex:r}){return[t("div",{staticClass:"text-center"},[t("vsc-button",{attrs:{type:"icon",icon:"codicon-edit text-base",title:"edit"},on:{click:function(o){return e.openEdit(n,r)}}}),t("vsc-button",{attrs:{type:"icon",icon:"codicon-remove text-base",title:"delete"},on:{click:function(o){return e.deleteConfirm(n)}}})],1)]}}],null,!1,4165395426)})],1),t($,{attrs:{title:e.$t("design.updateColumn"),visible:e.column.editVisible,top:"3vh",closeOnClickModal:!1,center:""},on:{"update:visible":function(n){return e.$set(e.column,"editVisible",n)}}},[t(M,{attrs:{inline:!0}},[t(T,{attrs:{label:e.$t("common.name")}},[t("vsc-input",{attrs:{size:"mini"},model:{value:e.editColumn.name,callback:function(n){e.$set(e.editColumn,"name",n)},expression:"editColumn.name"}})],1),t(T,{attrs:{label:e.$t("common.type")}},[t("vsc-input",{attrs:{size:"mini"},model:{value:e.editColumn.type,callback:function(n){e.$set(e.editColumn,"type",n)},expression:"editColumn.type"}})],1),t(T,{attrs:{label:e.$t("common.comment")}},[t("vsc-input",{attrs:{size:"mini"},model:{value:e.editColumn.comment,callback:function(n){e.$set(e.editColumn,"comment",n)},expression:"editColumn.comment"}})],1),[t(T,{attrs:{label:e.$t("common.default")}},[t("vsc-input",{attrs:{size:"mini"},model:{value:e.editColumn.defaultValue,callback:function(n){e.$set(e.editColumn,"defaultValue",n)},expression:"editColumn.defaultValue"}})],1)]],2),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("vsc-button",{attrs:{type:"secondary"},on:{click:function(n){e.column.editVisible=!1}}},[e._v(e._s(e.$t("common.cancel")))]),t("vsc-button",{attrs:{type:"primary",loading:e.column.editloading},on:{click:e.updateColumn}},[e._v(e._s(e.$t("common.ok")))])],1)],1),t($,{attrs:{title:e.$t("design.newColumn"),visible:e.column.visible,top:"3vh",closeOnClickModal:!1,center:""},on:{"update:visible":function(n){return e.$set(e.column,"visible",n)}}},[t(M,{attrs:{inline:!0}},[t(T,{attrs:{label:e.$t("common.name")}},[t("vsc-input",{attrs:{size:"mini"},model:{value:e.column.name,callback:function(n){e.$set(e.column,"name",n)},expression:"column.name"}})],1),t(T,{attrs:{label:e.$t("common.type")}},[t("vsc-input",{attrs:{size:"mini"},model:{value:e.column.type,callback:function(n){e.$set(e.column,"type",n)},expression:"column.type"}})],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("vsc-button",{attrs:{type:"secondary"},on:{click:function(n){e.column.visible=!1}}},[e._v(e._s(e.$t("common.cancel")))]),t("vsc-button",{attrs:{type:"primary",loading:e.column.loading},on:{click:e.doCreate}},[e._v(e._s(e.$t("common.ok")))])],1)],1)],1)},Me=[],$e=L(Oe,he,Me,!1,null,null,null,null);const Se=$e.exports,we={mixins:[C],data(){return{dialect:null,table:{name:null,newTableName:null,comment:null,newComment:null}}},mounted(){this.on("designMeta",a=>{this.table.name=a.table,this.table.newTableName=a.table,this.table.comment=a.comment,this.table.newComment=a.comment,this.dialect=w(a)}).on("success",()=>{P(this.$t("design.updateSuccess")),this.init()}).on("error",a=>{h(a)}).init()},methods:{updateTableMeta(){const a={...this.table,table:this.table.name};this.emit("updateTable",a),this.emit("execute",{sql:this.dialect.updateTable(a)})}}};var Ie=function(){var e=this,t=e._self._c;return t("div",{staticClass:"ml-4"},[t("div",{staticClass:"mb-3"},[t("div",{staticClass:"inline-block mr-5"},[t("label",{staticClass:"font-bold mr-5 inline-block"},[e._v(e._s(e.$t("design.table")))]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.table.newTableName,expression:"table.newTableName"}],staticClass:"w-48 field__input",attrs:{required:""},domProps:{value:e.table.newTableName},on:{keyup:function(n){return!n.type.indexOf("key")&&e._k(n.keyCode,"enter",13,n.key,"Enter")?null:e.updateTableMeta.apply(null,arguments)},input:function(n){n.target.composing||e.$set(e.table,"newTableName",n.target.value)}}})]),t("div",{staticClass:"inline-block mr-5"},[t("label",{staticClass:"font-bold mr-5 inline-block"},[e._v(e._s(e.$t("common.comment")))]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.table.newComment,expression:"table.newComment"}],staticClass:"w-48 field__input",domProps:{value:e.table.newComment},on:{keyup:function(n){return!n.type.indexOf("key")&&e._k(n.keyCode,"enter",13,n.key,"Enter")?null:e.updateTableMeta.apply(null,arguments)},input:function(n){n.target.composing||e.$set(e.table,"newComment",n.target.value)}}})]),t("div",{staticClass:"inline-block",staticStyle:{top:"-5px",position:"relative"}},[t("vsc-button",{attrs:{type:"success"},on:{click:e.updateTableMeta}},[e._v(e._s(e.$t("common.udpate")))])],1)])])},ge=[],fe=L(we,Ie,ge,!1,null,null,null,null);const De=fe.exports;const Ue={mixins:[C],components:{IndexPanel:ue,ColumnPanel:Se,InfoPanel:De,ForeignKey:be,DDL:Ne},data(){return{remainHeight:0,panels:[{id:"column",i18n:"design.column"},{id:"foreignKey",i18n:"design.foreignKey"},{id:"index",i18n:"design.index"},{id:"ddl",i18n:"design.ddl"}],activePanel:"column"}},mounted(){this.on("designMeta",t=>{t.dbType==m.CLICKHOUSE&&(this.panels=[{id:"column",i18n:"design.column"},{id:"index",i18n:"design.index"},{id:"ddl",i18n:"design.ddl"}])});const a=this.$refs.infoPanel,e=()=>{this.remainHeight=window.innerHeight-50-a.clientHeight};e(),new ResizeObserver(e).observe(a)}};var ye=function(){var e=this,t=e._self._c;return t("div",{staticClass:"mt-2 design-container"},[t("div",{ref:"infoPanel"},[t("InfoPanel"),t("ul",{staticClass:"tab"},e._l(e.panels,function(n,r){return t("li",{key:r,staticClass:"tab__item",class:{"tab__item--active":e.activePanel==n.id},on:{click:function(o){e.activePanel=n.id}}},[e._v(" "+e._s(e.$t(n.i18n))+" ")])}),0)],1),t("div",{staticClass:"mt-2 design-data-container"},[e.activePanel=="column"?t("ColumnPanel",{attrs:{remainHeight:e.remainHeight}}):e._e(),e.activePanel=="foreignKey"?t("ForeignKey",{attrs:{remainHeight:e.remainHeight}}):e._e(),e.activePanel=="index"?t("IndexPanel",{attrs:{remainHeight:e.remainHeight}}):e._e(),e.activePanel=="ddl"?t("DDL"):e._e()],1)])},Be=[],Fe=L(Ue,ye,Be,!1,null,"170f20a9",null,null);const et=Fe.exports;export{et as default};
