 /**越南语**/
 const Vietnam={
		lang:'vn',
		language: 'Vietnamese',
		loading: 'Name...',
		confirmText:'xác nhận',
		cancelText:'Thôi',
		login: {
			title:'Tìm kiếm những thứ lạ lùng',
			titleSmall:'Hàng vượt biên, phát đầu tiên, bắn trước.',
			login:'Đăng nhập',
			register:'Đăng ký',
			next:'bước kế tiếp',
			forgetPwd:'quên mật khẩu',
			other:'nhập vào tài khoản sau',
			noAccout:'không tài khoản?',
			Accout:'đã có một tài khoản rồi!',
			pleaceReg:'làm ơn đăng ký',
			placeLogin:'Làm ơn đăng nhập',
			phoneAccout:'Số điện thoại hay tài khoản',
			password:'mật khẩu (6-16) Name',
			phoneCode:'mật mã nhập nhập',
			getCode:'Mật khẩu',
			setPwd:'đặt mật khẩu',
			countyPhone:'Vietnam(+84)',
			lang:'Vietnamese',
			authorize:'ủy quyền tài khoản',
			selectCounty:'Quốc gia',
			selectLang:'Chọn ngôn ngữ',
			imageUrl:'Tải ảnh lên',
			name:'Nickname',
			goIndex:'nhập trang chủ',
			phone:'Vui lòng điền đúng số điện thoại di động'
		},
		myCollection: 'vật liệu hoàn chỉnh',
		detail:'Chi tiết',
		mine:{
			mineTitle:'của tôi',
			personal:'Thông tin cá nhân',
			bond:'Ký quỹ',
			btn:'Nạp tiền/rút tiền',
			order:'Đơn đặt hàng',
			allOrder:'Tất cả các đơn đặt hàng',
			paid:'Đang chờ thanh toán',
			delivered:'Đang chờ vận chuyển',
			received:'Đang chờ xử lý',
			completed:'Đã hoàn thành',
			other:'Các dịch vụ khác',
			scene:'Vỗ tay của tôi',
			address:'Địa chỉ giao hàng',
			bank:'Thẻ ngân hàng',
			customer:'Dịch vụ khách hàng',
			lang:'Cài đặt ngôn ngữ',
			editPwd:'Sửa đổi mật khẩu',
			account:'Liên kết tài khoản',
			about:'Về',
			avatar:'Hình đại học',
			nickname:'Biệt danh',
			logOut:'Đăng nhập không tham gia'
		},
		address:{
			reviseAddress: 'Sửa địa chỉ chuyển',
			newaddressName:'Địa chỉ tăng thu nhập mới',
			newAddress:'Thêm địa chỉ mới',
			consignee:'Người nhận hàng',
			writeName:'Vui lòng điền tên người nhận hàng',
			phone:'Số điện thoại di động',
			writePhone:'Vui lòng điền vào số điện thoại di động của người nhận hàng',
			received:'Địa chỉ giao hàng',
			writeRec:'Ví dụ: XX, thành phố XX, tỉnh XX',
			detailed:'Địa chỉ chi tiết',
			writeDeta:'Địa chỉ chi tiết: chẳng hạn như đường bộ, cộng đồng, số tòa nhà, số đơn vị, số nhà',
			setDefault:'Đặt địa chỉ mặc định',
			default:'Địa chỉ này được khuyến nghị theo mặc định cho mỗi đơn đặt hàng',
			save:'Lưu địa chỉ',
			languageTitle:'Thiết lập ngôn ngữ'
		},
		other:{
			oriPwd:'Mật khẩu ban đầu',
			newPwd:'Mật khẩu mới',
			conNewPwd:'Xác nhận mật khẩu mới',
			modify:'Xác nhận sửa đổi',
			content:'Bạn sẽ không thể đăng nhập nhanh chóng sau khi hủy liên kết và không thể đồng bộ hóa thông tin',
			title:'Bạn có muốn hủy liên kết',
			confirm:'Nâng',
			accountText:'Tài khoản bị ràng buộc có thể được đăng nhập chỉ bằng một cú nhấp chuột, thuận tiện và nhanh chó',
			accountText1:'Sau khi mở khóa, tài khoản ban đầu cần phải được liên kết lại với tài khoản lựa chọn kỳ lạ khi đăng nhập',
			update:'Cập nhật phiên bản',
			service:'Thỏa thuận dịch vụ',
			hotline:'Đường dây nóng dịch vụ khách hàng',
			aboutTitle:'Về việc tìm kiếm các tùy chọn kỳ lạ',
			onlookers: (ctx) => `${ctx.named('people')}người xem`,
			shoot:'Cảnh nóng',
			notice:'Ghi',
			start: 'Giá khởi đầu',
			currentPrice:'Giá hiện tại',
			jpPrice:'Giá đóng',
			shooting:'Đang chụp ảnh nóng',
			closed:'Chụp'
		},
		order:{
			orderTitle:'Đơn hàng của tôi',
			orderAll:'Tất cả',
			orderId:'Số đơn hàng,',
			wait:'Chờ nhận hàng',
			waitPay:'chờ thanh toán',
			delivery:'Chuyển',
			orderClose:'Đơn hàng đã đóng',
			bidPrice:'Giá trung bình',
			bond:'Ký quỹ',
			type:'Các loại',
			norms:'sự chỉ rõ',
			lot:'Bán đấu giá',
			payment:'Thanh toán thực tế',
			text:(ctx) =>`Vì bạn không thanh toán số dư trước ngày ${ctx.named('timer')}, khoản tiền gửi $ ${ctx.named('bond')} đã bị khấu trừ và đơn đặt hàng bị đóng`,
			timer:'Đếm ngược thanh toán',
			more:'Hơn',
			pay:'Trả',
			logistics:'Xem Logistics',
			btnDel:'xóa bỏ',
			receipt:'xác nhận việc nhận hàng'
		},
		margin:{
			record:'Ghi lại giao dịch',
			withdraw:'rút lui',
			recharge:'Nạp điện',
			amount:'Số tiền ký quỹ',
			text:'Vì việc rút tiền liên quan đến thanh toán của bên thứ ba và ngân hàng, thời gian đến thực tế sẽ được ưu tiên',
			withAmount:'Số tiền rút',
			cashAmount:'Số tiền hiện có',
			withAll:'Rút tất cả',
			withTo:'Rút tiền về',
			conWithdrawal:'Xác nhận rút tiền',
			payMargin:"Thanh toán ký quỹ",
			deposit:'Hoàn trả tiền đặt cọc',
			rechAmount:'Số tiền nạp',
			minAmount:'Số tiền nạp tối thiểu',
			rechMethod:'Phương thức nạp tiền',
			conRecharge:"Xác nhận nạp tiền",
			transaction:'Lệnh giao dịch',
			withOrder:'Lệnh rút tiền',
			noRecharge:'Chưa có kênh nào',
			addNow:'Thêm ngay bây giờ',
			
			freeze:'Ký quỹ đóng băng',
			unfreeze:'Ký quỹ mở ra',
			deduction:'Khấu trừ ký quỹ',
			depRecharge:'Nạp tiền',
			withdrawal:'Rút tiền ký quỹ',
			entrance:'Phí vào cửa',
			order:'Thanh toán đơn hàng',
			balance:'Nạp tiền vào số dư của bạn',
		},
		message:{
			orderEmpty:'Đơn hàng trống',
			recordEmpty:'Bản ghi giao dịch trống',
			loadmore: 'Nhẹ nhàng kéo lên',
			loading: 'Đang cố gắng tải',
			nomore: 'Đây là đáy, không còn nữa',
			minPay:'Ít hơn số tiền nạp tối thiểu',
			maxPay:'Số tiền rút tiền mặt vượt quá',
			writePhone:'vui lòng điền số điện thoại di động',
			obtainCode:'Nhận mã xác minh',
			outCode:'Mã xác minh đã được gửi',
			login:'Vui lòng điền đầy đủ thông tin tài khoản',
			perfectName:'tên nick',
			modify:'Đã sửa đổi thành công',
			password:'Mật khẩu mới không phù hợp với mật khẩu đã xác nhận',
			writeName:'Vui lòng điền tên người nhận hàng',
			writeAddress:'Vui lòng điền đầy đủ thông tin địa chỉ',
			noWifi:'Có một phiên bản mới được phát hành và phát hiện ra rằng bạn hiện không kết nối với Wifi. Để tiết kiệm lưu lượng của bạn, chương trình đã ngừng cập nhật tự động và sẽ kiểm tra lại và cập nhật sau khi bạn kết nối với WIFI. ',
			wifi:'Một phiên bản mới được phát hành, nó được phát hiện rằng bạn hiện đang kết nối với Wifi và chương trình đã bắt đầu tự động cập nhật. Sau khi phiên bản mới được tải xuống, trình cài đặt sẽ tự động bật lên. ',
			download:'Một phiên bản mới được phát hành và chúng tôi phát hiện thấy rằng bạn hiện đang kết nối với Wifi. Bạn có muốn tải xuống phiên bản mới ngay lập tức không? ',
			failedIns:'cài đặt thất bại',
			faileUpdate:'Cập nhật không thành công',
			updateTitle:'cập nhật phiên bản mới',
			updateNow:'cập nhật ngay lập tức',
			updateLater:'Cập nhật sau'
		},
		bankCard:{
			noBank:'Không có thẻ ngân hàng',
			tips:'lời nhắc',
			delBank:'Xác nhận xóa thẻ ngân hàng này',
			newBank:'Thêm thẻ ngân hàng',
			editBank:'Sửa đổi thẻ ngân hàng',
			submit:'Gửi đi',
			agree:'đồng ý',
			protocol:'Thỏa thuận Dịch vụ Thanh toán Nhanh',
			enter:'vui lòng nhập',
			choose:'xin vui lòng chọn',
			card:'Thông tin thẻ tín dụng (bắt buộc)',
			cardType:'Loại thẻ',
			cardNo:'số thẻ',
			cardTime:'Thời gian hiệu lực',
			cardName:'Thông tin Chủ thẻ (Bắt buộc)',
			name:'Họ',
			nickname:'tên đầu tiên',
			phone:'số điện thoại',
			email:'E-mail',
			address:'Địa chỉ thanh toán (bắt buộc)',
			county:'Quốc gia',
			province:'tỉnh',
			city:'thành phố',
			detaile:'Địa chỉ',
			postCode:'Mã bưu điện'
		},
		index:{
			auction:'Quy trình đấu giá',
			pick:'Chọn nhiều',
			deposit:'Thanh toán tiền đặt cọc bảo đảm',
			bidding:'Đấu thầu giá thầu',
			pay:'Trả khoản dư',
			receipt:'Xác nhận',
			noData:'Không có dữ liệu',
			load:'Đang tải',
			loading:'Đang tải',
			upLoad:'Kéo lên để tải thêm',
			loadMore:'Đây là đáy, nhiều lô hơn đang được chuẩn bị',
			notice:'Để ý',
			Bidding:'Name',
			explain: 'giải thích',
			highest: 'Hiện cao nhất',
			register: 'Comment',
			offer:'đề',
			bond:'Name',
			increase:'Số lần tăng',
			fee:'Phí nhập học',
			currentPrice:'Giá hiện tại',
			estimated:'Giá ước tính',
			begins:'Bắt đầu khoảng cách',
			end:'Khoảng cách',
			participation:'Phí tham gia',
			paid:'Được trả',
			first:'Để được trả, anh có ưu tiên chọn cộng đồng',
			payment:'Xác nhận thanh toán',
			paymentfees:'Thanh toán phí',
			success:'Giá thành công',
			shooting:'Hãy tham gia vào việc bắn súng.',
			continue:'Tiếp tục bắn',
			congratulations:'Chúc mừng.',
			midshot:'Quay lại',
			venue:'Nhập địa điểm'
		},
		payment:{
			bankCard:'Chọn thẻ ngân hàng bạn muốn thanh toán',
			addBank:'Thêm thẻ ngân hàng',
			info:'Điền thông tin',
			debit:'thẻ ghi nợ',
			credit:'Thẻ tín dụng',
			channel:'Các kênh thanh toán khác chưa được mở',
			debitNo:'Thanh toán bằng thẻ ghi nợ tạm thời không được hỗ trợ',
			rechange:'Recharge thành công',
			withdraw:'Rút tiền thành công',
			withdrawPrice:'Số tiền rút không được để trống',
			payMent:'thanh toán thành công'
		}
		
}


export default Vietnam;