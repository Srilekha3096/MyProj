"use strict";(self.webpackChunkjumbo_react_6_x=self.webpackChunkjumbo_react_6_x||[]).push([[851],{4851:(e,t,s)=>{s.r(t),s.d(t,{default:()=>N});var n=s(1413),o=s(72791),i=s(7993),l=s(20890),a=s(61889),r=s(68096),c=s(40131),p=s(64280),d=s(65523),f=s(10094),u=s(697),x=s(74569),h=s.n(x),m=s(20560),j=s(46170),y=s(89484),v=s(82030),g=s(38725),S=s(90466),C=s(12891),O=s(82839),E=s(35667),Z=s(27281),G=s(57702),T=s(56355),b=s(24459),R=s(24054),k=s(80184);const A=[{month:"Jan",Rent:4e3,Travel:2400,Entertainments:2400,Gifts:2800,OfficeSupplies:2800},{month:"Feb",Rent:3e3,Travel:1398,Entertainments:2210,Gifts:2300,OfficeSupplies:2300},{month:"Mar",Rent:2e3,Travel:9800,Entertainments:2290,Gifts:1400,OfficeSupplies:1400},{month:"Apr",Rent:2780,Travel:3908,Entertainments:2e3,Gifts:1400,OfficeSupplies:1400},{month:"May",Rent:1890,Travel:4800,Entertainments:2181,Gifts:4400,OfficeSupplies:4400},{month:"Jun",Rent:2390,Travel:3800,Entertainments:2500,Gifts:5400,OfficeSupplies:5400},{month:"Jul",Rent:3490,Travel:4300,Entertainments:2100,Gifts:6400,OfficeSupplies:6400},{month:"Aug",Rent:4e3,Travel:2400,Entertainments:2400,Gifts:2800,OfficeSupplies:2800},{month:"Sep",Rent:3e3,Travel:1398,Entertainments:2210,Gifts:2300,OfficeSupplies:2300},{month:"Oct",Rent:2e3,Travel:9800,Entertainments:2290,Gifts:1400,OfficeSupplies:1400},{month:"Nov",Rent:2780,Travel:3908,Entertainments:2e3,Gifts:1400,OfficeSupplies:1400},{month:"Dec",Rent:1890,Travel:4800,Entertainments:2181,Gifts:4400,OfficeSupplies:4400}],N=()=>{const[e,t]=(0,o.useState)(null),[s,x]=(0,o.useState)(),[N,_]=(0,o.useState)(),[B,P]=(0,o.useState)(),[w,I]=(0,o.useState)(null),[K,D]=(0,o.useState)(""),[U,L]=(0,o.useState)(""),[$,z]=(0,o.useState)(""),[F,q]=(0,o.useState)(3),[J,M]=(0,o.useState)(null),[V,X]=(0,o.useState)(""),[Y,H]=(0,o.useState)([]),[Q,W]=(0,o.useState)([]),[ee,te]=(0,o.useState)([]),se=localStorage.getItem("accesstoken"),ne={headers:{Authorization:"Bearer ".concat(se),"Content-Type":"application/json",Accept:"application/json"}},oe=28.6139,ie=77.209,{isLoaded:le}=(0,i.Ji)({googleMapsApiKey:"AIzaSyDl22ksIKq0yqXNjnrmy_PYRKcZVbLwAns"});console.log(K,U,$);const ae={lat:(null===w||void 0===w?void 0:w.lat)||oe,lng:(null===w||void 0===w?void 0:w.lng)||ie};(0,o.useEffect)((()=>{const e=b.ZP.getStatesOfCountry(null===K||void 0===K?void 0:K.isoCode);W(e)}),[K]),(0,o.useEffect)((()=>{if(K&&U){const e=R.Z.getCitiesOfState(K.isoCode,U.isoCode);te(e)}else te([])}),[K,U]);return(0,o.useEffect)((()=>{h().get("".concat(m._n,"/Erpapp/Partnerlist/"),ne).then((e=>{console.log("sevity",e.data.results),H(e.data.results)})).catch((e=>{console.log(e)}))}),[]),console.log("ZoomLevel",F),console.log("ownerNames",Y),(0,k.jsxs)(j.Z,{children:[(0,k.jsx)(l.Z,{variant:"h1",children:"Operations"}),(0,k.jsxs)(a.ZP,{container:!0,spacing:2,sx:{mt:2,mb:2},children:[(0,k.jsxs)(a.ZP,{item:!0,className:"row",xs:4,children:[(0,k.jsx)(l.Z,{className:"col-md-4 input-label",children:"Choose a BU"}),(0,k.jsx)(r.Z,{className:"col-6",children:(0,k.jsx)(c.Z,{options:Y,getOptionLabel:e=>(null===e||void 0===e?void 0:e.Partner_Name)||"",value:Y.find((e=>(null===e||void 0===e?void 0:e.Partner_Name)===V))||null,onChange:(e,t)=>{X(null===t||void 0===t?void 0:t.Partner_Name),M(t)},renderInput:e=>(0,k.jsx)(p.Z,(0,n.Z)((0,n.Z)({},e),{},{placeholder:"Choose a BU"})),className:"search-select"})})]}),(0,k.jsx)(a.ZP,{item:!0,className:"row",xs:3,children:(0,k.jsxs)(d.Z,{"aria-label":"split button",className:"col-12",onClick:()=>{var e,t,s;(async(e,t,s)=>{try{var n,o,i,l;const e="".concat(J.BusinessUnit_City,", ").concat(J.BusinessUnit_State,", ").concat(J.BusinessUnit_Country),t=await h().get("https://api.opencagedata.com/geocode/v1/json?q=".concat(encodeURIComponent(e),"&key=6c3e49178d1f4cca84a003096c7e1911"));I(null===t||void 0===t||null===(n=t.data)||void 0===n||null===(o=n.results[0])||void 0===o?void 0:o.geometry),console.log("GeoLocation",null===t||void 0===t||null===(i=t.data)||void 0===i||null===(l=i.results[0])||void 0===l?void 0:l.geometry)}catch(a){console.error("Error fetching coordinates:",a),console.error(a.response.data)}})(),e=K,t=U,s=$,console.log("countryyyyy",e,t,s),q(null!==s&&null!==t&&null!==e&&""!==s&&""!==t&&""!==e?11:null!==t&&null!==e&&""!==t&&""!==e?7:null!==e&&""!==e?4:3)},sx:{mt:{xs:.5,lg:0},mr:{xs:0,md:1}},children:[(0,k.jsx)(f.Z,{className:"plus-button",children:"Search"}),(0,k.jsx)(f.Z,{variant:"contained",className:"icon-button",children:(0,k.jsx)(T.U41,{size:18})})]})})]}),(0,k.jsxs)(a.ZP,{container:!0,spacing:2,sx:{mb:3,alignItems:"center"},children:[(0,k.jsx)(a.ZP,{item:!0,xs:6,children:le?(0,k.jsx)(y.Z,{children:(0,k.jsxs)(i.b6,{mapContainerStyle:{height:"500px",width:"100%"},zoom:11,center:ae,children:["(",(0,k.jsx)(i.jC,{position:{lat:null===w||void 0===w?void 0:w.lat,lng:null===w||void 0===w?void 0:w.lng},title:"ERP",onClick:()=>{console.log("info")}}),")"]})}):(0,k.jsx)(y.Z,{children:(0,k.jsx)(u.Z,{sx:{display:"flex",justifyContent:"center"},children:(0,k.jsx)("div",{class:"spinner-grow text-info",role:"status",children:(0,k.jsx)("span",{class:"visually-hidden",children:"Loading..."})})})})}),(0,k.jsx)(a.ZP,{item:!0,xs:6,children:(0,k.jsx)(v.h,{width:"100%",height:200,children:(0,k.jsxs)(g.v,{data:A,margin:{top:0,right:0,left:0,bottom:0},children:[(0,k.jsx)(S.K,{dataKey:"month"}),(0,k.jsx)(C.B,{}),(0,k.jsx)(O.q,{strokeDasharray:"3 3"}),(0,k.jsx)(E.u,{labelStyle:{color:"black"},itemStyle:{color:"black"},cursor:!1}),(0,k.jsx)(Z.D,{}),(0,k.jsx)("defs",{children:(0,k.jsxs)("linearGradient",{id:"Rent",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,k.jsx)("stop",{offset:"5%",stopColor:"#B819D2",stopOpacity:1}),(0,k.jsx)("stop",{offset:"95%",stopColor:"#6200EE",stopOpacity:1})]})}),(0,k.jsx)("defs",{children:(0,k.jsxs)("linearGradient",{id:"Travel",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,k.jsx)("stop",{offset:"5%",stopColor:"#9AF5FC",stopOpacity:1}),(0,k.jsx)("stop",{offset:"95%",stopColor:"#067F88",stopOpacity:1})]})}),(0,k.jsx)("defs",{children:(0,k.jsxs)("linearGradient",{id:"Entertainments",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,k.jsx)("stop",{offset:"5%",stopColor:"#FD7CBE",stopOpacity:1}),(0,k.jsx)("stop",{offset:"95%",stopColor:"#BB0663",stopOpacity:1})]})}),(0,k.jsx)("defs",{children:(0,k.jsxs)("linearGradient",{id:"Gifts",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,k.jsx)("stop",{offset:"5%",stopColor:"greenyellow",stopOpacity:1}),(0,k.jsx)("stop",{offset:"95%",stopColor:"green",stopOpacity:1})]})}),(0,k.jsx)("defs",{children:(0,k.jsxs)("linearGradient",{id:"OfficeSupplies",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,k.jsx)("stop",{offset:"5%",stopColor:"#EAEAEA",stopOpacity:1}),(0,k.jsx)("stop",{offset:"95%",stopColor:"#9A9D9D",stopOpacity:1})]})}),(0,k.jsx)(G.$,{dataKey:"Rent",stackId:"a",fill:"url(#Rent)"}),(0,k.jsx)(G.$,{dataKey:"Travel",stackId:"a",fill:"url(#Travel)"}),(0,k.jsx)(G.$,{dataKey:"Entertainments",stackId:"a",fill:"url(#Entertainments)"}),(0,k.jsx)(G.$,{dataKey:"Gifts",stackId:"a",fill:"url(#Gifts)"}),(0,k.jsx)(G.$,{dataKey:"OfficeSupplies",stackId:"a",fill:"url(#OfficeSupplies)"})]})})})]})]})}},38725:(e,t,s)=>{s.d(t,{v:()=>r});var n=s(625),o=s(57702),i=s(90466),l=s(12891),a=s(93137),r=(0,n.z)({chartName:"BarChart",GraphicalChild:o.$,defaultTooltipEventType:"axis",validateTooltipEventTypes:["axis","item"],axisComponents:[{axisType:"xAxis",AxisComp:i.K},{axisType:"yAxis",AxisComp:l.B}],formatAxisMap:a.t9})}}]);
//# sourceMappingURL=851.347a05ef.chunk.js.map