/**
 * Created by guyiyang on 2015/3/6.
 */
function LeCalcBtn(text, type) {
    ViewGroup.apply(this, new Array());

    var mX = 0;
    var mY = 0;
    var mW = 0;
    var mH = 0;

    this.setBorderRight(1, 0xffb2b2b2);
    this.setBorderBottom(1, 0xffb2b2b2);

    var mText = new TextView();
    mText.setGravity(Gravity.CENTER);
    mText.setTextSize(22);
    mText.setText(text);
    this.addView(mText);

    var mMask = new FrameLayout();
    mMask.setBackgroundColor(0x33000000);

    if (type == 0) {
        this.setBackgroundColor(0xfffafafa);
        mText.setTextColor(0xff4f4f4f);
    } else if (type == 1) {
        this.setBackgroundColor(0xffeaeaea);
        mText.setTextColor(0xff4f4f4f);
    } else {
        this.setBackgroundColor(0xfffdac29);
        mText.setTextColor(0xffffffff);
    }

    this.setEnable = function(enable) {
        if (enable) {
            this.setClickable(true);
            if (type == 0) {
                this.setBackgroundColor(0xfffafafa);
                mText.setTextColor(0xff4f4f4f);
            } else if (type == 1) {
                this.setBackgroundColor(0xffeaeaea);
                mText.setTextColor(0xff4f4f4f);
            } else {
                this.setBackgroundColor(0xfffdac29);
                mText.setTextColor(0xffffffff);
            }
        } else {
            this.setClickable(false);
            if (type == 0) {
                this.setBackgroundColor(0xfffafafa);
                mText.setTextColor(0xffcccccc);
            } else if (type == 1) {
                this.setBackgroundColor(0xffeaeaea);
                mText.setTextColor(0xffcccccc);
            } else {
                this.setBackgroundColor(0xffeaeaea);
                mText.setTextColor(0xffffffff);
            }
        }
    }

    this.setEnable(true);

    this.getText = function() {
        return mText;
    }

    this.setPosAndSize = function(x, y, w, h) {
        mX = x;
        mY = y;
        mW = w;
        mH = h;
    }

    this.getX = function() {
        return mX;
    }

    this.getY = function() {
        return mY;
    }

    this.onTouchEvent = function(ev) {
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                if (type == 0) {
                    this.setBackgroundColor(0xffd5d5d5);
                } else if (type == 1) {
                    this.setBackgroundColor(0xffc7c7c7);
                } else {
                    this.setBackgroundColor(0xffd79223);
                }
                break;
            case MotionEvent.ACTION_UP:
            case MotionEvent.ACTION_CANCEL:
                if (type == 0) {
                    this.setBackgroundColor(0xfffafafa);
                } else if (type == 1) {
                    this.setBackgroundColor(0xffeaeaea);
                } else {
                    this.setBackgroundColor(0xfffdac29);
                }
                break;
        }
    }

    this.onMeasure = function(widthMS, heightMS) {
        var w = mW * mUnitWidth;
        var h = mH * mUnitHeight;
        mText.measure(MeasureSpec.makeMeasureSpec(w, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(h, MeasureSpec.EXACTLY));
        mMask.measure(w, h);
        this.setMeasuredDimension(w, h);
    }

    this.onLayout = function(x, y) {
        var offsetX = 0;
        var offsetY = 0;
        mMask.layout(offsetX, offsetY);
        mText.layout(offsetX, offsetY);
    }
}

function LeGenderBtn(text, type) {
    LeCalcBtn.apply(this, new Array(text, type));

    var mSelf = this;

    var mMaleText = new TextView();
    mMaleText.setTextSize(22);
    mMaleText.setTextColor(0xff4f4f4f);
    mMaleText.setGravity(Gravity.CENTER);
    mMaleText.setText("男");
    this.addView(mMaleText);

    var mFemaleText = new TextView();
    mFemaleText.setTextSize(22);
    mFemaleText.setTextColor(0xff4f4f4f);
    mFemaleText.setGravity(Gravity.CENTER);
    mFemaleText.setText("女");
    this.addView(mFemaleText);

    var mSwitch = new LeSwitch();
    this.addView(mSwitch);

    this.getSwitch = function() {
        return mSwitch;
    }

    this.onMeasure = function(widthMS, heightMS) {
        var width = mUnitWidth * 2;
        var height = mUnitHeight;
        mMaleText.measure(MeasureSpec.makeMeasureSpec(mUnitWidth, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(mUnitHeight, MeasureSpec.EXACTLY));

        mFemaleText.measure(MeasureSpec.makeMeasureSpec(mUnitWidth, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(mUnitHeight, MeasureSpec.EXACTLY));

        mSwitch.measure(0, 0);

        this.setMeasuredDimension(width, height);
    }

    this.onLayout = function(x, y) {
        var offsetX = 0;
        var offsetY = (this.getMeasuredHeight() - mMaleText.getMeasuredHeight()) / 2;
        mMaleText.layout(offsetX, offsetY);

        offsetX += mUnitWidth;
        mFemaleText.layout(offsetX, offsetY);

        offsetX = (this.getMeasuredWidth() - mSwitch.getMeasuredWidth()) / 2;
        offsetY = (this.getMeasuredHeight() - mSwitch.getMeasuredHeight()) / 2;
        mSwitch.layout(offsetX, offsetY);
    }
}

function LeSwitch() {
    ViewGroup.apply(this, new Array());

    var mSelf = this;

    this.WIDTH = 44;
    this.HEIGHT = 22;

    var mIsOn = true;

    var mThumb = new Thumb();
    this.addView(mThumb);

    var corner = this.HEIGHT / 2 + 1;
    this.setCornerSize(corner, corner, corner, corner);
    this.setBorder(1, 0xffc0c0c0);

    this.isOn = function() {
        return mIsOn;
    }

    var mOnAnimation = new TranslateAnimation(20, 0, 0, 0);
    mOnAnimation.setDuration(100);
    mThumb.setAnimation(mOnAnimation);

    var mOffAnimation = new TranslateAnimation(0, 20, 0, 0);
    mOffAnimation.setDuration(100);
    mThumb.setAnimation(mOffAnimation);

    this.switchOn = function() {
        if (mIsOn) {
            return;
        }

        mIsOn = true;
        //translate.setFillAfter(true);

        mOnAnimation.start();
    }

    this.switchOff = function() {
        if (!mIsOn) {
            return;
        }

        mIsOn = false;
        //translate.setFillAfter(true);
        mOffAnimation.start();
    }

    this.onMeasure = function(widthMS, heightMS) {
        mThumb.measure(0, 0);
        this.setMeasuredDimension(this.WIDTH, this.HEIGHT);
    }

    this.onLayout = function(x, y) {
        var offsetX = 3;
        var offsetY = (this.getMeasuredHeight() - mThumb.getMeasuredHeight()) / 2 - 1;
        mThumb.layout(offsetX, offsetY);
    }
}

function Thumb() {
    ViewGroup.apply(this, new Array());

    this.SIZE = 16;

    var corner = this.SIZE / 2;
    this.setCornerSize(corner, corner, corner, corner);
    this.setBackgroundColor(0xfffdac29);

    this.onMeasure = function(widthMS, heightMS) {
        this.setMeasuredDimension(this.SIZE, this.SIZE);
    }
}

function LeBackBtn(text, type) {
    LeCalcBtn.apply(this, new Array(text, type));

    this.getText().setTextSize(32);
}

function LeEqualBtn(text, type) {
    LeCalcBtn.apply(this, new Array(text, type));

    this.getText().setTextSize(40);
}