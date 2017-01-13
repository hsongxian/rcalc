/**
 * Created by guyiyang on 2015/2/25.
 */
function LeFrameTitlebar() {
    ViewGroup.apply(this, new Array());

    this.TITLEBAR_HEIGHT = 52;

    var mTitle = new TextView();
    mTitle.setTextSize(22);
    mTitle.setGravity(Gravity.CENTER);
    this.addView(mTitle);

    var mBackButton = new BackButton();
    mBackButton.setOnClickListener(function() {exitFullscreen()});
    this.addView(mBackButton);

    this.setText = function(title) {
        mTitle.setText(title);
    }

    this.setTextColor = function(color) {
        mTitle.setTextColor(color);
    }

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = this.TITLEBAR_HEIGHT;
        mTitle.measure(width, MeasureSpec.makeMeasureSpec(this.TITLEBAR_HEIGHT, MeasureSpec.EXACTLY));
        mBackButton.measure(height, this.TITLEBAR_HEIGHT);
        this.setMeasuredDimension(width, height);
    }

    this.onLayout = function(x, y) {
        var offsetX = 0;
        var offsetY = 0;
        mBackButton.layout(offsetX, offsetY);
        mTitle.layout(offsetX, offsetY)
    }

}

function BackButton() {
    View.apply(this, new Array());

    this.setWillNotDraw(false);

    var mColor = 0xff333333;

    this.onTouchEvent = function(ev) {
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                mColor = 0xff999999;
                this.invalidate();
                break;
            case MotionEvent.ACTION_UP:
            case MotionEvent.ACTION_CANCEL:
                mColor = 0xff333333;
                this.invalidate();
                break;
        }
    }

    this.onDraw = function(canvas) {
        canvas.clearRect(0,0,this.getMeasuredWidth(),this.getMeasuredHeight());
        canvas.strokeStyle = Utils.toCssColor(mColor);
        canvas.lineWidth = 1;
        canvas.moveTo(31, 14);
        canvas.lineTo(18, 26);
        canvas.lineTo(31, 38)
        canvas.stroke();
    }
}