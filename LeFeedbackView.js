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
    mTitlebar.setText("关于我");
    mTitlebar.setBackgroundColor(0xffeaeaea);
    mTitlebar.setBorderBottom(1, 0x33191919);
    this.addView(mTitlebar);

    var mCopyright = new TextView();
    mCopyright.setTextSize(20);
    mCopyright.setTextColor(0xff757575);
    mCopyright.setText("就是不告诉你，我的信息");
    mCopyright.setGravity(Gravity.BOTTOM | Gravity.LEFT);
    mCopyright.setPadding(1);
    this.addView(mCopyright);


    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        mTitlebar.measure(widthMS, 0);

        var contentWidth = width - this.PADDING * 2;

        var copyrightWidth = contentWidth - 100 - this.PADDING;
        mCopyright.measure(MeasureSpec.makeMeasureSpec(copyrightWidth, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec( 88, MeasureSpec.EXACTLY));
   
        this.setMeasuredDimension(width, height);
    }

    this.onLayout = function(x, y) {
        var offsetX = 0;
        var offsetY = 0;
        mTitlebar.layout(offsetX, offsetY);

        offsetX = this.PADDING;
        offsetY += mTitlebar.getMeasuredHeight() + this.VPADDING;

        offsetY +=  this.VPADDING;

        offsetX = this.getMeasuredWidth() - this.PADDING ;

        offsetX = this.PADDING;
        offsetY -= 16;
        mCopyright.layout(offsetX, offsetY);

    }
    

}
