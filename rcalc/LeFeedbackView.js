/**
 * Created by guyiyang on 2015/3/26.
 */
function LeFeedbackView() {
    ViewGroup.apply(this, new Array());

    this.MARGIN = 12;
    this.PADDING = 12;
    this.VPADDING = 12;

    this.setBackgroundColor(0xfff1f1f1);

    var mTitlebar = new LeFrameTitlebar();
    mTitlebar.setText("反馈");
    mTitlebar.setBackgroundColor(0xffeaeaea);
    mTitlebar.setBorderBottom(1, 0x33191919);
    this.addView(mTitlebar);

    var mFeedback = new EditText();
    mFeedback.setPadding(6, 6, 6, 6);
    mFeedback.setBorder(1, 0x33191919);
    mFeedback.setSingleLine(false);
    mFeedback.setTextSize(14);
    mFeedback.setHintText("请输入您的问题或建议");
    mFeedback.setHintColor(0x66191919);
    mFeedback.setCornerSize(3,3,3,3);
    mFeedback.setTextChangedListener(function() {
        if (mFeedback.getText() == "") {
            mFeedback.setHintText("请输入您的问题或建议");
            mFeedback.setHintColor(0x66191919);
        }
    });
    this.addView(mFeedback);

    var mNum = new EditText();
    mNum.setBorder(1, 0x33191919);
    mNum.setPadding(6, 0, 6, 0);
    mNum.setTextSize(14);
    mNum.setHintColor(0x66191919);
    mNum.setHintText("联系QQ或手机号");
    mNum.setCornerSize(3,3,3,3);
    this.addView(mNum);

    var mCopyright = new TextView();
    mCopyright.setTextSize(12);
    mCopyright.setTextColor(0xff757575);
    mCopyright.setText("亲戚计算器由绿茶浏览器提供，感谢三姑六婆提供创意");
    mCopyright.setGravity(Gravity.BOTTOM | Gravity.LEFT);
    mCopyright.setPadding(1);
    this.addView(mCopyright);

    var mSubmit = new SubmitBtn();
    mSubmit.setOnClickListener(function() {
        if (mFeedback.getText().trim() == "") {
            mFeedback.setHintText("不能输入空白内容哦");
            mFeedback.setHintColor(0x99990000);
        } else {
            sendFeedback(mFeedback.getText(), mNum.getText());
            exitFullscreen();
        }
    });
    this.addView(mSubmit);

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        mTitlebar.measure(widthMS, 0);

        var contentWidth = width - this.PADDING * 2;

        mFeedback.measure(contentWidth, 80);

        mNum.measure(contentWidth, 36);

        var copyrightWidth = contentWidth - 100 - this.PADDING;
        mCopyright.measure(MeasureSpec.makeMeasureSpec(copyrightWidth, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(36, MeasureSpec.EXACTLY));
        mSubmit.measure(100, 36);

        this.setMeasuredDimension(width, height);
    }

    this.onLayout = function(x, y) {
        var offsetX = 0;
        var offsetY = 0;
        mTitlebar.layout(offsetX, offsetY);

        offsetX = this.PADDING;
        offsetY += mTitlebar.getMeasuredHeight() + this.VPADDING;
        mFeedback.layout(offsetX, offsetY);

        offsetY += mFeedback.getMeasuredHeight() + this.VPADDING;
        mNum.layout(offsetX, offsetY);

        offsetX = this.getMeasuredWidth() - this.PADDING - mSubmit.getMeasuredWidth();
        offsetY += mNum.getMeasuredHeight() + this.VPADDING;
        mSubmit.layout(offsetX, offsetY);

        offsetX = this.PADDING;
        offsetY -= 16;
        mCopyright.layout(offsetX, offsetY);
    }
}

function SubmitBtn() {
    ViewGroup.apply(this, new Array());

    this.setBackgroundColor(0xff1499f7);
    this.setCornerSize(3, 3, 3, 3);

    var mText = new TextView();
    mText.setTextColor(0xffffffff);
    mText.setText("提交");
    mText.setGravity(Gravity.CENTER);
    this.addView(mText);

    this.onTouchEvent = function(ev) {
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                this.setBackgroundColor(0xff106699);
                break;
            case MotionEvent.ACTION_CANCEL:
            case MotionEvent.ACTION_UP:
                this.setBackgroundColor(0xff1499f7);
                break;
        }
    }

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        mText.measure(MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY));

        this.setMeasuredDimension(width, height);
    }
}

function sendFeedback(msg, num) {
    var url = "http://fw.mb.lenovomm.com/feedback/put/?plat=rcalc&contact='" + num + "'&content='" + msg + "'&callback=jsonp1";
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}
