/**
 * 接口列表文件
 * auth代表接口是否需要token
 */
const version = 'v1'
export default {
	/** 获取支持的语言 **/
	languages: {
		url: `api/${version}/setting/languages`,
		auth: false,
		method: 'GET',
	},
	
	/** 获取banner信息 **/
	banners: {
		url: `api/${version}/setting/banners`,
		auth: false,
		method: 'GET',
	},
	/** 获取分类信息 **/
	categories: {
		url: `api/${version}/auction/categories`,
		auth: false,
		method: 'GET',
	},
	/** 获取拍场列表 **/
	auction: {
		url: `api/${version}/auctions`,
		auth: false,
		method: 'GET',
	},
	/** 获取拍场详情 **/
	auctionDetail: {
		url: `api/${version}/auctions/`,
		auth: false,
		method: 'GET',
	},
	/** 详情页入场及之后 **/
	enterDetail: {
		/** 入场 **/
		enter: {
			url: `api/${version}/auctions/`,
			auth: true,
			method: 'POST',
		},
		/** 出价 **/
		bid: {
			url: `api/${version}/auctions/`,
			auth: true,
			method: 'POST',
		}
	},
	
	/** 地址信息 **/
	address: {
		/** 新增地址 **/
		address: {
			url: `api/${version}/address`,
			auth: true,
			method: 'POST',
		},
		/** 修改地址 **/
		revise: {
			url: `api/${version}/address/`,
			auth: true,
			method: 'POST',
		},
		/** 获取地址列表 **/
		addressList: {
			url: `api/${version}/address`,
			auth: true,
			method: 'GET',
		},
		/** 删除地址 **/
		deleteAddress: {
			url: `api/${version}/address/`,
			auth: true,
			method: 'DELETE',
		}
	},
	/** 银行卡信息 **/
	cards: {
		/** 新增银行卡 **/
		addcards: {
			url: `api/${version}/bank/cards`,
			auth: true,
			method: 'POST',
		},
		/** 修改银行卡 **/
		revise: {
			url: `api/${version}/bank/cards/`,
			auth: true,
			method: 'POST',
		},
		/** 获取银行卡列表 **/
		cardList: {
			url: `api/${version}/bank/cards`,
			auth: true,
			method: 'GET',
		},
		/** 删除银行卡 **/
		deleteCard: {
			url: `api/${version}/bank/cards/`,
			auth: true,
			method: 'DELETE',
		}
	},
	/** 获取国家代码信息 **/
	countries: {
		url: `api/${version}/setting/countries`,
		auth: false,
		method: 'GET',
	},
	mobile:{
		/** 获取验证码 **/
		code:{
			url: `api/${version}/user/mobile/code`,
			auth: false,
			method: 'POST',
		},
		/** 注册 **/
		register:{
			url: `api/${version}/user/mobile/register`,
			auth: false,
			method: 'POST',
		},
		/** 获取图形验证码 **/
		imgCode:{
			url: `api/${version}/user/image/code`,
			auth: false,
			method: 'GET',
		},
		// api/{version}/user/image/code
	},
	/** 登录 **/
	auth:{
		url: `api/${version}/auth/mobile`,
		auth: false,
		method: 'POST',
	},
    /** 获取天气 **/
    test: {
    	url: 'api?version=v9&appid=23035354&appsecret=8YvlPNrz',
    	auth: false,
    	method: 'GET',
    	// desc: '初始化数据',
    },
    
	/** 初始化 ↓ **/
	init: {
		url: 'index/init',
		auth: false,
		method: 'GET',
		// desc: '初始化数据',
	},

	/** 上传Base64图片 ↓ **/
	uploadBase64: {
		url: 'index/uploadBase64',
		auth: false,
		method: 'POST',
		// desc: '上传Base64位图片',
	},
	/** 订单 ↓ **/
	order: {
		/** 我的订单查询 ↓ **/
		order:{
			url: `api/${version}/auction/orders`,
			auth: true,
			method: 'GET',
		},
		/** 查询订单未读数 ↓ **/
		unread:{
			url: `api/${version}/auction/orders/status/unread`,
			auth: true,
			method: 'GET',
			// /auction/orders/status/unread
		},
		/** 设置订单已读 ↓ **/
		read:{
			url: `api/${version}/auction/orders/status/`,
			auth: true,
			method: 'POST',
			//   api/{version}/auction/orders/status/{status}/read
		},
		/** 获取订单详情 ↓ **/
		orderInfo:{
			url: `api/${version}/auction/orders/`,
			auth: true,
			method: 'GET',
			//   /api/{version}/auction/orders/{orderNo}
		},
		// /** 支付订单 ↓ **/
		// orderPay:{
		// 	url: `api/${version}/auction/orders/`,
		// 	auth: true,
		// 	method: 'POST',
		// 	//   /api/{version}/auction/orders/{orderNo}
		// },
		/** 支付订单 ↓ **/
		orderPay:{
			url: `api/${version}/pay/`,
			auth: true,
			method: 'POST',
			//   /api/{version}/pay/{channel}/goods/order/{orderNo}
		},
		
		/** 删除订单 ↓ **/
		orderDel:{
			url: `api/${version}/auction/orders/`,
			auth: true,
			method: 'DELETE',
			//   /api/{version}/auction/orders/{orderNo}
		},
		/** 订单确认收货 ↓ **/
		confirm:{
			url: `api/${version}/auction/orders/`,
			auth: true,
			method: 'GET',
			//   api/{version}/auction/orders/{orderNo}/confirm
		},
		/** 查询订单的物流信息 ↓ **/
		logistics:{
			url: `api/${version}/auction/orders/`,
			auth: true,
			method: 'GET',
			//   api/{version}/auction/orders/{orderNo}/logistics
		},
		// desc: '上传Base64位图片',
	},
	pay:{
		/** 获取交易流水 ↓ **/
		flow: {
			url: `api/${version}/fund/flow`,
			auth: true,
			method: 'GET',
			// /api/{version}/fund/flow
		},
		/** 获取可用支付渠道 ↓ **/
		channel:{
			url: `api/${version}/pay/channel`,
			auth: true,
			method: 'GET',
			// /api/{version}/pay/channel
		},
		/** 提现申请 ↓ **/
		withdraw:{
			url: `api/${version}/withdraw`,
			auth: true,
			method: 'POST',
			// /api/{version}/withdraw
		},
		/** 充值 ↓ **/
		recharge:{
			url: `api/${version}/pay/`,
			auth: true,
			method: 'POST',
			// api/{version}/pay/{channel}/recharge
		},
		
	},
	
	/** 用户 ↓ **/
	user: {
		/** 保证金 ↓ **/
		// deposit: {
		// 	url: `api/${version}/user/deposit`,
		// 	auth: true,
		// 	method: 'GET',
		// 	// desc: '用户信息',
		// },
		/** 获取余额 ↓ **/
		deposit: {
			url: `api/${version}/user/balance`,
			auth: true,
			method: 'GET',
			// desc: '用户信息',
		},
		/** 修改用户信息 ↓ **/
		editUser: {
			url: `api/${version}/user`,
			auth: true,
			method: 'POST',
			// desc: '用户信息',
		},
		/** 获取用户信息 ↓ **/
		user: {
			url: `api/${version}/user`,
			auth: true,
			method: 'GET',
			// desc: '用户信息',
		},
		/** 修改密码 ↓ **/
		password:{
			url: `api/${version}/user/password`,
			auth: true,
			method: 'POST',
			// desc: '用户信息'
		},
		profile: {
			url: 'user/profile',
			auth: true,
			method: 'POST',
			// desc: '修改用户信息',
		},

		changeMobile: {
			url: 'user/changemobile',
			auth: true,
			method: 'POST',
			// desc: '修改手机号',
		},

	},

};
