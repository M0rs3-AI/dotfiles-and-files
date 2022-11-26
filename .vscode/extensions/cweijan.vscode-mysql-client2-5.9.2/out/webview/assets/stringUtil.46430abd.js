import{D as i}from"./codeMirror.068e734c.js";function f(t,r,n=!0){return t==null||["MongoDB"].includes(r)||n=="never"||(n==!0&&(n="always"),n==!1&&(n="auto"),r==i.JDBC&&n=="auto")?t:t.match(/[A-Z]/g)||t.match(/[-\s()]+/g)||n=="always"||t.match(/^(user|IF|KEY|DESC|LENGTH|GROUP|ORDER|TABLE|FROM|JOIN|INDEX|CONDITION|SYSTEM|TABLE|TYPE|VALUE|BACKUP|BEGIN|ACCOUNT|ACTION|ALL|ANY|CURRENT|DATA|GRANT|character|explain|union|REGEXP|source|date|condition)$/i)?r=="SqlServer"?t.split(".").map(a=>`"${a}"`).join("."):[i.MYSQL,i.MARIA_DB,i.NEO4J].includes(r)?`\`${t}\``:`"${t}"`:t}function s(t,r,n){if(r===""||r==null)return"null";if(n=="MongoDB"&&/.+?\(.*?\)/.exec(r))return r;if(typeof r=="string"){switch(n){case i.ES:return r;case i.MYSQL:if(t=="point"&&r&&r!="null")try{const a=JSON.parse(r);return`ST_GeomFromText ('POINT(${a.x} ${a.y})')`}catch{}case i.ORACLE:if(t.match(/DATE/))return`TO_DATE('${r}','yyyy/mm/dd hh24:mi:ss')`;break}r=r.replace(/'/g,"''")}return t?u(t)?r:n==i.SQLITE?`'${r}'`.replace(/\\/g,"\\"):`'${r}'`.replace(/\\/g,"\\\\"):`'${r}'`}function u(t){if(!t)return!1;const r=t.toLowerCase();switch(r){case"int":case"bit":case"real":case"number":case"numeric":case"decimal":case"float":case"double":case"bool":case"boolean":return!0;default:if(!r.match(/point/i)&&r.match(/(int|range|serial)/i))return!0}return!1}function h(t){if(!t)return;const{type:r}=t;if(!r)return;const n=r.match(/^(text|mediumtext|longtext|mediumblob|longblob)/i);return n?n[0]:r}function E(t,r){if(!r)return null;switch(t){case i.MYSQL:case i.MARIA_DB:const{columnType:n,columnLength:a,flags:m}=r;return c[n]=="blob"&&m==16?a==1020?"TINYTEXT":"text":c[n];case i.ORACLE:return r.type;case i.PG:case i.REDSHIFT:const l=r.dataTypeID;return o[l]}}var o=(t=>(t[t.bool=16]="bool",t[t.bytea=17]="bytea",t[t.char=18]="char",t[t.bigint=20]="bigint",t[t.smallint=21]="smallint",t[t.integer=23]="integer",t[t.regproc=24]="regproc",t[t.text=25]="text",t[t.oid=26]="oid",t[t.tid=27]="tid",t[t.xid=28]="xid",t[t.cid=29]="cid",t[t.json=114]="json",t[t.xml=142]="xml",t[t.pg_node_tree=194]="pg_node_tree",t[t.smgr=210]="smgr",t[t.path=602]="path",t[t.polygon=604]="polygon",t[t.cidr=650]="cidr",t[t.real=700]="real",t[t["double precision"]=701]="double precision",t[t.abstime=702]="abstime",t[t.reltime=703]="reltime",t[t.tinterval=704]="tinterval",t[t.circle=718]="circle",t[t.macaddr8=774]="macaddr8",t[t.money=790]="money",t[t.macaddr=829]="macaddr",t[t.inet=869]="inet",t[t.aclitem=1033]="aclitem",t[t.character=1042]="character",t[t.varchar=1043]="varchar",t[t.date=1082]="date",t[t.time=1083]="time",t[t.timestamp=1114]="timestamp",t[t.timestamptz=1184]="timestamptz",t[t.interval=1186]="interval",t[t.timetz=1266]="timetz",t[t.bit=1560]="bit",t[t.varbit=1562]="varbit",t[t.numeric=1700]="numeric",t[t.refcursor=1790]="refcursor",t[t.regprocedure=2202]="regprocedure",t[t.regoper=2203]="regoper",t[t.regoperator=2204]="regoperator",t[t.regclass=2205]="regclass",t[t.regtype=2206]="regtype",t[t.uuid=2950]="uuid",t[t.txid_snapshot=2970]="txid_snapshot",t[t.pg_lsn=3220]="pg_lsn",t[t.pg_ndistinct=3361]="pg_ndistinct",t[t.pg_dependencies=3402]="pg_dependencies",t[t.tsvector=3614]="tsvector",t[t.tsquery=3615]="tsquery",t[t.gtsvector=3642]="gtsvector",t[t.regconfig=3734]="regconfig",t[t.regdictionary=3769]="regdictionary",t[t.jsonb=3802]="jsonb",t[t.regnamespace=4089]="regnamespace",t[t.regrole=4096]="regrole",t))(o||{}),c=(t=>(t[t.decimal=0]="decimal",t[t.tinyint=1]="tinyint",t[t.smallint=2]="smallint",t[t.int=3]="int",t[t.float=4]="float",t[t.double=5]="double",t[t.null=6]="null",t[t.timestamp=7]="timestamp",t[t.bigint=8]="bigint",t[t.int24=9]="int24",t[t.date=10]="date",t[t.time=11]="time",t[t.datetime=12]="datetime",t[t.year=13]="year",t[t.newdate=14]="newdate",t[t.bit=16]="bit",t[t.timestamp2=17]="timestamp2",t[t.datetime2=18]="datetime2",t[t.time2=19]="time2",t[t.json=245]="json",t[t.newdecimal=246]="newdecimal",t[t.enum=247]="enum",t[t.set=248]="set",t[t.tiny_blob=249]="tiny_blob",t[t.medium_blob=250]="medium_blob",t[t.long_blob=251]="long_blob",t[t.blob=252]="blob",t[t.varchar=253]="varchar",t[t.string=254]="string",t[t.geometry=255]="geometry",t))(c||{});function _(t){return t==null?!0:typeof t=="string"?["","NULL","undefined"].includes(t.toUpperCase()):!1}function A(t){return t==null?void 0:t.replace(/(^'|'$)/g,"")}export{s as a,E as b,_ as c,h as g,u as i,A as t,f as w};
