/**
 * Created by guyiyang on 2015/3/5.
 */
function LeCalcView() {
    ViewGroup.apply(this, new Array());

    this.MIN_RESULT_HEIGHT = 120;

    this.setTag("calcview");

    var mSelf = this;
    var mResultView = new LeCalcResult();
    var mShouldParse = false;
    var mShouldReset = false;
    var mJustClickPerson = false;

    var mBtns = new Array();
    var gender = new LeGenderBtn("", 1);
    iAmMale();
    mResultView.getSubText().setText("我是男的，我的");
    gender.setOnClickListener(function() {
        mJustClickPerson = false;
        var result = mSelf.getResultView();
        result.getText().setText("");
        result.getSubText().setText("");
        clearRelation();
        if (gender.getSwitch().isOn()) {
            gender.getSwitch().switchOff();
            iAmFeMale();
            result.getSubText().setText("我是女的，我的");
        } else {
            gender.getSwitch().switchOn();
            iAmMale();
            result.getSubText().setText("我是男的，我的");
        }
    });

    this.addView(gender);
    mBtns.add(gender);

    this.disableKeys = function() {
        for (var i = 0; i < mBtns.size(); i++) {
            if (mBtns[i] != gender && mBtns[i] != younger && mBtns[i] != older) {
                mBtns[i].setEnable(false);
            } else {
                mBtns[i].setEnable(true);
            }
        }
    }

    this.enableKeys = function() {
        for (var i = 0; i < mBtns.size(); i++) {
            if (mBtns[i] != gender && mBtns[i] != younger && mBtns[i] != older) {
                mBtns[i].setEnable(true);
            }
            younger.setEnable(false);
            older.setEnable(false);
        }
    }

    var younger = new LeCalcBtn("年轻", 1);
    younger.setOnClickListener(function() {
        mJustClickPerson = false;
        notifyIsOlder(false);
        mSelf.enableKeys();

        var name = getNewestResult();
        var result = mSelf.getResultView();
        result.getText().setText(name);
        mShouldParse = false;

        var process = "";
        for (var i = 0; i < myOperations.length - 1; i++) {
            process += myOperations[i].inputname + "的 "
        }
        process += myOperations[i].inputname + "＝";
        result.getSubText().setText(process);
        resetOperation();
    })
    younger.setEnable(false);
    this.addView(younger);
    mBtns.add(younger);

    var older = new LeCalcBtn("年长", 1);
    older.setOnClickListener(function() {
        mJustClickPerson = false;
        notifyIsOlder(true);
        mSelf.enableKeys();

        var name = getNewestResult();
        var result = mSelf.getResultView();
        result.getText().setText(name);
        mShouldParse = false;

        var process = "";
        for (var i = 0; i < myOperations.length - 1; i++) {
            process += myOperations[i].inputname + "的 "
        }
        process += myOperations[i].inputname + "＝";
        result.getSubText().setText(process);
        resetOperation();
    });
    older.setEnable(false);
    this.addView(older);
    mBtns.add(older);


    var ac = new LeCalcBtn("清空", 1);
    ac.setOnClickListener(function() {
        mJustClickPerson = false;
        var result = mSelf.getResultView();
        result.getText().setText("");
        result.getSubText().setText("");
        clearRelation();
        result.getSubText().setText("我的");
    });
    this.addView(ac);
    mBtns.add(ac);

    var back = new LeBackBtn("＜", 1);
    back.setOnClickListener(function() {
        var result = mSelf.getResultView();
        if (mJustClickPerson) {
            result.getText().setText("");
        } else {
            removeRelation();
            result.getText().setText("");
            result.getSubText().setText(genProcessText("的"));
        }

        mJustClickPerson = false;
    });
    this.addView(back);
    mBtns.add(back);

    var de = new LeCalcBtn("的", 1);
    de.setOnClickListener(function() {
        mJustClickPerson = false;
        var result = mSelf.getResultView();
        var subtext = result.getSubText().getText();
        mShouldReset = false;
        if (mShouldParse) {
            addRelation(result.getText().getText());
            if (shouldCheckAge()) {
                result.getSubText().setText("比" + getAgeCmpPersion() + "年长还是年轻？");
                result.getText().setText("");
                mSelf.disableKeys();
                return;
            }
            var name = getNewestResult();
            result.getText().setText(name);

            mShouldParse = false;
        }
        result.getSubText().setText(genProcessText("的"));
    });
    this.addView(de);
    mBtns.add(de);

    var equal = new LeEqualBtn("＝", 2);
    equal.setOnClickListener(function() {
        mJustClickPerson = false;
        var result = mSelf.getResultView();
        var subtext = result.getSubText().getText();
        mShouldReset = true;
        if (mShouldParse) {
            addRelation(result.getText().getText());
            if (shouldCheckAge()) {
                result.getSubText().setText("比" + getAgeCmpPersion() + "年长还是年轻？");
                result.getText().setText("");
                mSelf.disableKeys();
                return;
            }
            var name = getNewestResult();
            result.getText().setText(name);
            mShouldParse = false;
        }
        result.getSubText().setText(genProcessText("＝"));
        resetOperation();
    });
    this.addView(equal);
    mBtns.add(equal);

    var father = new LeCalcBtn("父", 0);
    father.setOnClickListener(function() {
        mJustClickPerson = true;
        mSelf.getResultView().getText().setText("父亲");
        mSelf.onRelationClick();
    });
    this.addView(father);
    mBtns.add(father);

    var mother = new LeCalcBtn("母", 0);
    mother.setOnClickListener(function() {
        mJustClickPerson = true;
        mSelf.getResultView().getText().setText("母亲");
        mSelf.onRelationClick(); 
    });
    this.addView(mother);
    mBtns.add(mother);

    var husband = new LeCalcBtn("夫", 0);
    husband.setOnClickListener(function() {
        mJustClickPerson = true;
        mSelf.getResultView().getText().setText("丈夫");
        mSelf.onRelationClick();
    });
    this.addView(husband);
    mBtns.add(husband);

    var wife = new LeCalcBtn("妻", 0);
    wife.setOnClickListener(function() {
        mJustClickPerson = true;
        mSelf.getResultView().getText().setText("妻子");
        mSelf.onRelationClick();
    });
    this.addView(wife);
    mBtns.add(wife);

    var son = new LeCalcBtn("子", 0);
    son.setOnClickListener(function() {
        mJustClickPerson = true;
        mSelf.getResultView().getText().setText("儿子");
        mSelf.onRelationClick();
    });
    this.addView(son);
    mBtns.add(son);

    var daughter = new LeCalcBtn("女", 0);
    daughter.setOnClickListener(function() {
        mJustClickPerson = true;
        mSelf.getResultView().getText().setText("女儿");
        mSelf.onRelationClick();
    });
    this.addView(daughter);
    mBtns.add(daughter);

    var obrother = new LeCalcBtn("兄", 0);
    obrother.setOnClickListener(function() {
        mJustClickPerson = true;
        mSelf.getResultView().getText().setText("哥哥");
        mSelf.onRelationClick();
    });
    this.addView(obrother);
    mBtns.add(obrother);

    var ybrother = new LeCalcBtn("弟", 0);
    ybrother.setOnClickListener(function() {
        mJustClickPerson = true;
        mSelf.getResultView().getText().setText("弟弟");
        mSelf.onRelationClick();
    });
    this.addView(ybrother);
    mBtns.add(ybrother);

    var osister = new LeCalcBtn("姐", 0);
    osister.setOnClickListener(function() {
        mJustClickPerson = true;
        mSelf.getResultView().getText().setText("姐姐");
        mSelf.onRelationClick();
    });
    this.addView(osister);
    mBtns.add(osister);

    var ysister = new LeCalcBtn("妹", 0);
    ysister.setOnClickListener(function() {
        mJustClickPerson = true;
        mSelf.getResultView().getText().setText("妹妹");
        mSelf.onRelationClick();
    });
    this.addView(ysister);
    mBtns.add(ysister);

    this.addView(mResultView);

    this.onRelationClick = function() {
        mShouldParse = true;
        checkException();
        if (mShouldReset) {
            clearRelation();
            mShouldReset = false;
        }
    }

    this.getResultView = function() {
        return mResultView;
    }

    this.loadPortrait = function() {
        gender.setPosAndSize(0, 0, 2, 1);
        older.setPosAndSize(2, 0, 1, 1);
        younger.setPosAndSize(3, 0, 1, 1);

        father.setPosAndSize(0, 1, 1, 1);
        husband.setPosAndSize(1, 1, 1, 1);
        son.setPosAndSize(2, 1, 1, 1);
        ac.setPosAndSize(3, 1, 1, 1);

        mother.setPosAndSize(0, 2, 1, 1);
        wife.setPosAndSize(1, 2, 1, 1);
        daughter.setPosAndSize(2, 2, 1, 1);
        back.setPosAndSize(3, 2, 1, 1);

        obrother.setPosAndSize(0, 3, 1, 1);
        osister.setPosAndSize(1, 3, 1, 1);
        de.setPosAndSize(2, 3, 1, 2);
        equal.setPosAndSize(3, 3, 1, 2);

        ybrother.setPosAndSize(0, 4, 1, 1);
        ysister.setPosAndSize(1, 4, 1, 1);
    }

    this.loadLandScape = function() {
        gender.setPosAndSize(0, 0, 2, 1);
        older.setPosAndSize(2, 0, 1, 1);
        younger.setPosAndSize(3, 0, 1, 1);

        father.setPosAndSize(0, 1, 1, 1);
        mother.setPosAndSize(0, 2, 1, 1);

        husband.setPosAndSize(1, 1, 1, 1);
        wife.setPosAndSize(1, 2, 1, 1);

        son.setPosAndSize(2, 1, 1, 1);
        daughter.setPosAndSize(2, 2, 1, 1);

        obrother.setPosAndSize(3, 1, 1, 1);
        ybrother.setPosAndSize(3, 2, 1, 1);

        osister.setPosAndSize(4, 1, 1, 1);
        ysister.setPosAndSize(4, 2, 1, 1);

        back.setPosAndSize(4, 0, 2, 1);
        ac.setPosAndSize(6, 0, 2, 1);

        de.setPosAndSize(5, 1, 2, 2);
        equal.setPosAndSize(7, 1, 1, 2);
    }

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        var resultHeight = 0;
        if (width > height) {
            mUnitWidth = width / 8;
            resultHeight = height - mUnitWidth * 3;
            if (resultHeight < this.MIN_RESULT_HEIGHT) {
                resultHeight = this.MIN_RESULT_HEIGHT;
            }
            mUnitHeight = (height - resultHeight) / 3;
            this.loadLandScape();
        } else {
            mUnitWidth = width / 4;
            resultHeight = height - mUnitWidth * 5;
            if (resultHeight < this.MIN_RESULT_HEIGHT) {
                resultHeight = this.MIN_RESULT_HEIGHT;
            }
            mUnitHeight = (height - resultHeight) / 5;
            this.loadPortrait();
        }
        var textSize = resultHeight / 4;
        var subtextSize = resultHeight / 9;
        if (textSize > 40) {
            textSize = 40;
        }
        if (subtextSize < 18) {
            subtextSize = 18;
        }

        mResultView.getText().setTextSize(textSize);
        mResultView.getSubText().setTextSize(subtextSize);

        mResultView.measure(width, resultHeight);

        for (var i = 0; i < mBtns.size(); i++) {
            mBtns[i].measure(0, 0);
        }

        this.setMeasuredDimension(width, height);
    }

    this.onLayout = function(x, y) {
        var offsetX = 0;
        var offsetY = 0;
        mResultView.layout(offsetX, offsetY);

        for (var i = 0; i < mBtns.size(); i++) {
            offsetX = mBtns[i].getX() * mUnitWidth;
            offsetY = mResultView.getMeasuredHeight() + mBtns[i].getY() * mUnitHeight;
            mBtns[i].layout(offsetX, offsetY);
            if (mBtns[i].getMeasuredWidth() + offsetX >= this.getMeasuredWidth()) {
                mBtns[i].setBorderRight(0, 0);
            } else {
                mBtns[i].setBorderRight(1, 0xffb2b2b2);
            }
            mBtns[i].layout(offsetX, offsetY);
            if (mBtns[i].getMeasuredHeight() + offsetY >= this.getMeasuredHeight() - 1) {
                mBtns[i].setBorderBottom(0, 0);
            } else {
                mBtns[i].setBorderBottom(1, 0xffb2b2b2);
            }
        }
    }

}


