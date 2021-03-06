 /**菲律宾语**/
 const Philippines={
		lang:'ph',
		language: 'Filipino',
		loading: 'Kinukuha...',
		confirmText:'confirm',
		cancelText:'Itigil',
		login: {
			title:'Paghahanap ng kakaibang bagay',
			titleSmall:'Cross border goods, first shot, first served',
			login:'Login',
			register:'register',
			next:'susunod na hakbang',
			forgetPwd:'kalimutan ang password',
			other:'log in sa sumusunod na account',
			noAccout:'Walang account?',
			Accout:'Mayroon na ang isang account!',
			pleaceReg:'mangyaring mag-register',
			placeLogin:'Mag-login',
			phoneAccout:'mobile number or account',
			password:'password (6-16 na karakter)',
			phoneCode:'input verification code',
			getCode:'Verification Code',
			setPwd:'set password',
			countyPhone:'Filipino(+63)',
			lang:'Filipino',
			authorize:'account authorization succeeded',
			selectCounty:'Host country',
			selectLang:'Piliin ang wika',
			imageUrl:'I-upload ang Avatar',
			name: 'pangalan',
			goIndex: 'pumunta sa bahay',
			phone:'Mangyaring punan ang tamang numero ng mobile phone'
		},
		myCollection: 'kumpletong materyal',
		detail:'Mga Detalye',
		
		
		mine:{
			mineTitle:'Aking',
			personal:'Personal na impormasyon',
			bond:'Margin',
			btn:'recharge/cash out',
			order:'Order',
			allOrder:'Lahat ng order',
			paid:'Bayaran',
			delivered:'Upang maipadala',
			received:'Upang matanggap',
			completed:'Nakumpleto',
			other:'Iba pang mga serbisyo',
			scene:'Shoot ko',
			address:'Pagtanggap ng address',
			bank:'Bank card',
			customer:'Customer Service Hotline',
			lang:'Mga setting ng wika',
			editPwd:'Baguhin ang password',
			account:'Account Association',
			about:'Tungkol sa',
			avatar:'Avatar',
			nickname:'Palayaw',
			logOut:'Lumabas sa login'
		},
		address:{
			reviseAddress: 'Baguhin ang address ng pagpapadala',
			newaddressName:'Bagong address ng kita',
			newAddress:'Magdagdag ng bagong address',
			consignee:'Ang consignee',
			writeName:'Punan lamang ang pangalan ng tatanggap',
			phone:'Numero ng telepono',
			writePhone:'Mangyaring punan ang cell phone number ng cell phone',
			received:'Pagtanggap ng address',
			writeRec:'E.g.: XX City XX District, XX Probinsya',
			detailed:'Detalyadong address',
			writeDeta:'Detalyadong address: hal. kalsada, komunidad, gusali ng numero, unit number, numero ng bahay',
			setDefault:'Itakda ang default na address',
			default:'Ang address na ito ay inirerekomenda ng default tuwing maglalagay ka ng order',
			save:'save address',
			languageTitle:'Pagtatakda ng wika'
		},
		other:{
			oriPwd:'Orihinal na password',
			newPwd:'Bagong password',
			conNewPwd:'Kumpirmahin ang bagong password',
			modify:'Kumpirmahin ang pagbabago',
			content:'Hindi ka makaka-sign in kaagad pagkatapos ng disassociation, at hindi ka makaka-sync ng impormasyon',
			title:'Gusto mo bang mag-disassociate',
			confirm:'Unredding',
			accountText:'Binding account ay maaaring naka-log in sa isang click, maginhawa at mabilis',
			accountText1:'Pagkatapos ng unbinding, ang orihinal na account login ay kailangang ipagbawal na maghanap ng mga kakaibang item account',
			update:'Version update',
			service:'Kasunduan sa Serbisyo',
			hotline:'Customer Service Hotline',
			aboutTitle:'Tungkol sa paghahanap ng kakaibang mga bagay',
			onlookers: (ctx) => `${ctx.named('people')}mga tao manonood`,
			shoot:'subasta',
			notice:'notice',
			start: 'Simulang presyo',
			currentPrice:'Kasalukuyang presyo',
			jpPrice:'Pagsasara ng presyo',
			shooting:'Mainit na pagbaril',
			closed:'Sarado'
		},
		order:{
			orderTitle:'Aking Order',
			orderAll:'Lahat',
			orderId:'Numero ng order',
			wait:'Maghintay para sa paghahatid',
			waitPay:'maghintay para sa bayad',
			delivery:'Paghahatid',
			orderClose:'Sarado ang order',
			bidPrice:'Mid Presyo',
			bond:'Margin',
			type:'Mga uri ng',
			norms:'pagtutukoy',
			lot:'Subasta',
			payment:'Tunay na pagbabayad',
			text:(ctx) =>`Dahil hindi mo binayaran ang balanse bago ang ${ctx.named('timer')}, ang deposito na $ ${ctx.named('bond')} ay nabawasan at ang order ay sarado`,
			timer:'Pagbibilang ng bayad',
			more:'Marami',
			pay:'Magbayad',
			logistics:'Tingnan ang Logistics',
			btnDel:'tanggalin',
			receipt:'kumpirmahin ang resibo ng mga kalakal'
		},
		margin:{
			record:'Tala ng Transaksyon',
			withdraw:'bawiin',
			recharge:'Mag-recharge',
			amount:'Halaga ng margin',
			text:'Habang ang pag-atras ay nagsasangkot ng pagbabayad ng third-party at mga bangko, ang tunay na oras ng pagdating ay mananaig',
			withAmount:'Kalakihan ng kinuha',
			cashAmount:'Magagamit na halaga ng cash',
			withAll:'Bawiin lahat',
			withTo:'Umatras sa',
			conWithdrawal:'Kumpirmahin ang pag-atras',
			payMargin:"Magbayad ng margin",
			deposit:'Refund ng deposito',
			rechAmount:'Recharge na halaga',
			minAmount:'Minimum na halaga ng muling pagsingil',
			rechMethod:'Pamamaraan ng muling pagkarga',
			conRecharge:"Kumpirmahin ang recharge",
			transaction:'Order ng transaksyon',
			withOrder:'Bawiin ang order',
			noRecharge:'Wala pang mga channel',
			addNow:'Idagdag ito ngayon',
			
			freeze:'Pag-freeze ng margin',
			unfreeze:'Nag-iinit ang margin',
			deduction:'Pagbawas sa margin',
			depRecharge:'Pag-recharge ng deposito',
			withdrawal:'Pag-atras ng margin',
			entrance:'Bayad sa pagpasok',
			order:'Pay order',
			balance:'I-recharge ang iyong balanse',
		},
		message:{
			orderEmpty:'Walang laman ang order',
			recordEmpty:'Walang laman ang tala ng transaksyon',
			loadmore: 'Hilahin nang malumanay',
			loading: 'Sinusubukang i-load',
			nomore: 'Ito ang ilalim, wala nang',
			minPay:'Mas mababa sa minimum na halaga ng muling pagsingil',
			maxPay:'Lumagpas na halaga ng cash withdrawal',
			writePhone:'mangyaring punan ang numero ng cell phone',
			obtainCode:'Pagkuha ng verification code',
			outCode:'Ipinadala ang verification code',
			login:'Mangyaring kumpletuhin ang impormasyon ng account',
			perfectName:'palayaw',
			modify:'Matagumpay na nabago',
			password:'Ang bagong password ay hindi naaayon sa nakumpirmang password',
			writeName:'Mangyaring punan ang pangalan ng consignee',
			writeAddress:'Mangyaring kumpletuhin ang impormasyon sa address',
			noWifi:'May isang bagong bersyon na inilabas, at napansin na hindi ka kasalukuyang nakakonekta sa Wifi. Upang mai-save ang iyong trapiko, tumigil ang programa sa awtomatikong pag-update at muling susuriin at i-update pagkatapos mong kumonekta sa WIFI. ',
			wifi:'Isang bagong bersyon ang pinakawalan, napansin na ikaw ay kasalukuyang nakakonekta sa Wifi, at ang programa ay nagsimulang awtomatikong mag-update. Matapos ma-download ang bagong bersyon, awtomatikong lalabas ang installer. ',
			download:'Isang bagong bersyon ang pinakawalan, at napansin na kasalukuyang nakakonekta ka sa Wifi. Nais mo bang i-download kaagad ang bagong bersyon? ',
			failedIns:'Nabigo ang pag-install',
			faileUpdate:'Nabigo ang pag-update',
			updateTitle:'bagong pag-update ng bersyon',
			updateNow:'i-update agad',
			updateLater:'Magbago mamaya'
		},
		bankCard:{
			noBank:'Walang bank card',
			tips:'prompt',
			delBank:'Kumpirmahing tanggalin ang bank card',
			newBank:'Magdagdag ng bank card',
			editBank:'Baguhin ang bank card',
			submit:'ipasa',
			agree:'sumang-ayon',
			protocol:'Kasunduan sa Serbisyo sa Express Payment',
			enter:'pasok',
			choose:'mangyaring pumili',
			card:'Impormasyon sa credit card (kinakailangan)',
			cardType:'uri ng kard',
			cardNo:'numero ng card',
			cardTime:'Panahon ng bisa',
			cardName:'Impormasyon sa Cardholder (Kinakailangan)',
			name:'Huling pangalan',
			nickname:'pangalan',
			phone:'numero ng telepono',
			email:'E-mail',
			address:'Address ng pagsingil (kinakailangan)',
			county:'bansa',
			province:'lalawigan',
			city:'lungsod',
			detaile:'Address',
			postCode:'Postal code'
		},
		
		index:{
			auction:'Proseso ng subasta',
			pick:'Pumili ng maraming',
			deposit:'Magbayad ng security deposit',
			bidding:'Bid bid',
			pay:'Bayaran ang balanse',
			receipt:'Kumpirmahin ang resibo',
			noData:'Walang data',
			load:'Naglo-load',
			loading:'Naglo-load',
			upLoad:'Pull up to load more',
			loadMore:'Ito ang ilalim, maraming maraming inihahanda',
			notice:'Paunawa',
			Bidding:'Pag-aalok',
			explain: 'ipaliwanag',
			highest: 'Current highest',
			register: 'Register',
			offer:'inaalok',
			bond:'bond',
			increase:'Stock label',
			fee:'Pambabayad ng pagtanggap',
			currentPrice:'Kasalukuyang presyo',
			estimated:'Estimated price',
			begins:'Ang layo ay nagsisimula',
			end:'keyboard label',
			participation:'Pambabayad sa Participation',
			paid:'Upang bayaran',
			first:'Sa tingin ko mayroon kang prioridad upang pumili ng margin account deduction',
			payment:'Confirm payment',
			paymentfees:'Pagbayad ng bayad',
			success:'Ang matagumpay na bid',
			shooting:'Dalhin ang bahagi sa pagbaril',
			continue:'Patuloy ang pagbaril',
			congratulations:'Congratulations',
			midshot:'Mid shot',
			venue:'Ipasok ang venue'
		},
		payment:{
			bankCard:'Piliin ang bank card na nais mong bayaran',
			addBank:'Magdagdag ng bank card',
			info:'Punan ang impormasyon',
			debit:'debit card',
			credit:'Credit Card',
			channel:'Ang iba pang mga channel sa pagbabayad ay hindi pa nabuksan',
			debitNo:'Ang pagbabayad ng debit card ay hindi suportado pansamantala',
			rechange:'Maging matagumpay ang muling pagkarga',
			withdraw:'Matagumpay na Withdrawal',
			withdrawPrice:'Ang halaga ng pag-atras ay hindi maaaring walang laman',
			payMent:'matagumpay ang transaksiyon'
		}
}


export default Philippines;