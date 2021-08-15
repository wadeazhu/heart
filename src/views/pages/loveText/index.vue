<template>
  <section>
    <section class="textImage" ref="textImage">
      <div class="public"><span class="iconfont icon-gongkai"></span><span>公开</span></div>
      <header>
        <div class="selfInfo">
          <div class="img">
            <img src="./image/head.jpg" width="100" alt="">
          </div>

          <div class="nameSendInfo">
            <div class="nickname">
              <span>文案小店子</span>
<!--              <span class="crown"></span>-->
            </div>

            <div class="sendInfo">
              <span>{{date}}</span>
              <span>来自</span>
              <span class="iphone">iPhone 12</span>
            </div>
          </div>

        </div>
        <div class="readCount">
          <span>{{readCount}}</span>
          <span>阅读</span>
        </div>
      </header>
      <main>
        {{content}}
      </main>

      <footer>
        <div><span class="iconfont icon-zhuanfa"></span><span>{{footerInfo.forwarding}}</span></div>
        <div><span class="iconfont icon-pinglun"></span><span>{{footerInfo.comments}}</span></div>
        <div><span class="iconfont icon-dianzan"></span><span>{{footerInfo.star}}</span></div>
      </footer>
    </section>

    <el-button
      type="primary"
      size="mini"
      @click="exportTextImg()">
      <d2-icon name="eye"/>导出图片
    </el-button>
  </section>
</template>

<script>
  import html2canvas from "html2canvas"
  import {making} from "@/api/modules/loveText";
  import {textList} from "@/views/pages/loveText/textList";

  export default {
  name: 'index',
    data() {
      return{
        date: "8-13 13:24",
        readCount: 0,
        footerInfo: {
          forwarding: 0,
          comments: 0,
          star: 0,
        },
        content: "秋天到了，你的外套只能我穿，肩膀只能我靠，抱抱只能是我，你也只能属于我，不止秋天以后都是我的",
        timer: null,
        index: 0
      }
    },
  methods: {
    exportTextImg() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.exportImg(this.index)
        this.exportTextImg()
        this.index++
      }, 1e3)
    },
    exportImg(index) {
      const month = new Date().getMonth() + 1
      const date = new Date().getDate()
      const sj = new Date().toLocaleString('chinese', { hour12: false }).split(" ")[1]
      this.date = `${month}-${date}  ${sj}`
      this.readCount = this.getRangeOfRandom(500, 999)
      this.footerInfo.forwarding = this.getRangeOfRandom(500, 999)
      this.footerInfo.comments = this.getRangeOfRandom(500, 999)
      this.footerInfo.star = this.getRangeOfRandom(500, 999)
      this.content = textList[index]
      html2canvas(this.$refs.textImage,{
        scale: 1 || window.devicePixelRatio,
        height: this.$refs.textImage.clientHeight - 1,
        width: 1080
      }).then(res => {
        // console.log(res.width, res.height)
        // const width = 1080
        // const dpi = 1080 / res.width
        // const height = res.height * dpi
        // res.width = width
        // res.height = height
        console.log(res)
        const dataURL = res.toDataURL("image/png")
        // this.downloadImg(dataURL, "13244")
        let blob = this.dataUrlToBlob(dataURL);
        return making(blob)
      }).then(res => {
        console.log(res)
      })
    },
    downloadImg(url, fileName){
      const oA = document.createElement("a");
      oA.download = fileName;// 设置下载的文件名，默认是'下载'
      oA.href = url;
      document.body.appendChild(oA);
      oA.click();
      oA.remove(); // 下载之后把创建的元素删除                       // 触发鼠标点击事件
    },
    dataUrlToBlob(dataUrl) {
      let arr = dataUrl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        // arr[0]是data:image/png;base64
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      let imgFile = new Blob([u8arr], {
        type: mime
      });
      return imgFile;
    },
    getRangeOfRandom(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    }
  }
}
</script>

<style scoped lang="scss">
  .textImage {
    color: #fff;
    background-color: #2c2c2c;
    width: 1080px;
    font-family: "Microsoft YaHei",serif;
    .public {
      padding: 25px 35px;
      border-bottom: 1px solid #3b3b3b;
      color: #878787;
      span {
        font-size: 35px;
      }

      span + span {
        margin-left: 15px;
      }
      img {
        border-radius: 50%;
      }
    }
    header {
      padding: 25px 35px 17px;
      display: flex;
      justify-content: space-between;

      .selfInfo {
        display: flex;
        align-items: center;
        .nameSendInfo {
          margin-left: 30px;
          .nickname {
            color: #ff5555;
            font-size: 35px;
            span.crown {
              background-position: -125px -125px;
              display: inline-block;
              background-image: url("./image/icon.png");
              background-repeat: no-repeat;
            }
          }
          .sendInfo {
            font-size: 25px;
            margin-top: 9px;
            color: #9a9a9a;
            span + span{
              margin-left: 12px;
            }
            .iphone {
              color: #55c8ff;
            }
          }
        }
        img {
          border-radius: 50%;
        }
      }
      .readCount {
        display: flex;
        flex-direction: column;
        text-align: center;
        border: 1px solid #525252;
        border-radius: 47px;
        font-size: 20px;
        height: 51px;
        padding: 3px 52px;
        color: #adadad;
        span + span {
          margin-top: -4px;
        }
      }
    }

    main {
      padding: 0 35px 30px;
      font-size: 37px;
      border-bottom: 1px solid #3b3b3b;
      line-height: 60px;
      color: #dedede;
    }
    footer {
      display: flex;
      justify-content: space-between;
      padding: 25px 90px;
      div {
        display: flex;
        span + span {
          margin-left: 8px;
        }
      }
      span.iconfont {
        font-size: 40px;
      }
      span {
        font-size: 30px;
        color: #dedede;
      }
    }
  }

</style>
