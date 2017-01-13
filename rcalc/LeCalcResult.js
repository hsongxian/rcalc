/**
 * Created by guyiyang on 2015/3/6.
 */
function LeCalcResult() {
    ViewGroup.apply(this, new Array());

    this.setTag("calcresult");

    this.setBackgroundColor(0xff272727);

    var mText = new TextView();
    mText.setTextColor(0xffe4e4e4);
    mText.setSingleLine(true);
    mText.setGravity(Gravity.CENTER_VERTICAL | Gravity.RIGHT);
    this.addView(mText);

    var mSubText = new TextView();
    mSubText.setTextColor(0xff888888);
    mSubText.setSingleLine(true);
    //mSubText.setText("a");
    mSubText.setGravity(Gravity.BOTTOM | Gravity.RIGHT);
    this.addView(mSubText);

    var mMask = new LeResultMask();
    this.addView(mMask);

    var mInfo = new LeInfoBtn();
    mInfo.setOnClickListener(function() {
        var d = new LeFeedbackView();
        showFullscreen(d);
    });
    this.addView(mInfo);

    this.getText = function() {
        return mText;
    }

    this.getSubText = function() {
        return mSubText;
    }

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        var contentWidth = width - 16;
        mText.measure(MeasureSpec.makeMeasureSpec(contentWidth, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(height / 2, MeasureSpec.EXACTLY));

        mSubText.measure(MeasureSpec.makeMeasureSpec(contentWidth, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(height / 2, MeasureSpec.EXACTLY));

        mMask.measure(LeResultMask.MASK_WIDTH, heightMS);

        mInfo.measure(0, 0);

        this.setMeasuredDimension(width, height);
    }

    this.onLayout = function(x, y) {
        var offsetX = 0;
        var offsetY = 0;

        mMask.layout(offsetX, offsetY);

        mSubText.layout(offsetX, offsetY);

        offsetY += mSubText.getMeasuredHeight();
        mText.layout(offsetX, offsetY);

        offsetY = 0;
        mInfo.layout(offsetX, offsetY);
    }
}

function LeInfoBtn() {
    ViewGroup.apply(this, new Array());

    this.RADIUS = 11;

    var mText = new TextView();
    mText.setCornerSize(this.RADIUS, this.RADIUS, this.RADIUS, this.RADIUS);
    mText.setBorder(1, 0x99ffffff);
    mText.getDiv().innerHTML = "<i><font color='cccccc'>i</font></i>";
    mText.setGravity(Gravity.CENTER);
    mText.setTextColor(0x99ffffff);
    mText.setTextSize(16);
    this.addView(mText);

    this.onMeasure = function(widthMS, heightMS) {
        var width = 52;
        var height = 52;
        mText.measure(MeasureSpec.makeMeasureSpec(this.RADIUS * 2, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(this.RADIUS * 2, MeasureSpec.EXACTLY));
        this.setMeasuredDimension(width, height);
    }

    this.onLayout = function(x, y) {
        var offsetX = (52 - this.RADIUS * 2) / 2;
        var offsetY = (52 - this.RADIUS * 2) / 2;
        mText.layout(offsetX, offsetY);
    }
}

function LeResultMask() {
    ViewGroup.apply(this, new Array());

    this.setWillNotDraw(false);
    this.setClickable(false);

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        this.setMeasuredDimension(width, height);
    }

    this.onDraw = function(canvas) {
        canvas.translate(0.5,0.5);

        var g1 = canvas.createLinearGradient(0, 0, 50, 0);

        g1.addColorStop(0, Utils.toCssColor(0xff262626));
        g1.addColorStop(1, Utils.toCssColor(0x002c2c2c));
        canvas.fillStyle = g1;
        canvas.beginPath();
        canvas.fillRect(0, 0, 50, this.getMeasuredHeight());
    }
}
Object.defineProperty(LeResultMask,"MASK_WIDTH",{value:50});