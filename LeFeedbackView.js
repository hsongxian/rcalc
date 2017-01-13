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
    mCopyright.setTextSize(66);
    mCopyright.setTextColor(0xff757575);
    mCopyright.setText("就是不告诉你，我的信息");
    mCopyright.setGravity(Gravity.BOTTOM | Gravity.LEFT);
    mCopyright.setPadding(1);
    this.addView(mCopyright);


    var mGithHub = new TextView();
    mGithHub.setTextSize(12);
    mGithHub.setTextColor(0xff757575);
    mGithHub.setText("");
    mGithHub.setGravity(Gravity.BOTTOM | Gravity.LEFT);
    mGithHub.setPadding(1);
    mGithHub.setOnClickListener(function() {
       
    });

    this.addView(mGithHub);



}
