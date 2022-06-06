<template>
    <div v-show="$route.path !== '/'" class="float-btn">
        <ul>
            <li title="代码" @click="$modal.show('code')">
                <i class="eva eva-code"></i>
            </li>
            <li title="打赏" @click="$modal.show('pay')">
                <i class="eva eva-gift"></i>
            </li>
            <li title="分享" @click="share">
                <i class="eva eva-share"></i>
                <span></span>
            </li>
        </ul>
        <div class="main" :title="collected ? '收藏本工具' : '取消收藏'" @click="collect">
            <i v-if="collected" class="eva eva-star"></i>
            <i v-else class="eva eva-star-outline"></i>
        </div>
        <client-only>
            <modal class="code" name="code" height="auto" width="500" reset adaptive>
                <div class="title">
                    将以下代码放到你的网页中
                </div>
                <Dynamic tag="pre" :template="iframeText" />
            </modal>
            <modal class="pay" name="pay" height="auto" width="300" reset adaptive>
                <div class="title">
                    请作者喝一杯咖啡？
                </div>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAvQAAANSCAAAAAAvhQWNAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAFxEAABcRAcom8z8AADn7SURBVHja7Z17tGVXWeVvhSIhhBAgoLyaDAgQBSIgrdhgRgF20ypgO3gOCBIUsIfIqwlI20hDa/Ax7AE+kOcY0hARaFQ60hIiShoVGwgIIQjyaEBpGgyEJARISIqcpurufe695561z/rWnHPtfc6a8x+9Z681v++b3y9F1b2nTm3NLKsxbY3dgGXVlqG3mpOht5qTobeak6G3mpOht5qTobeak6G3mpOht5qTobeak6G3mpOht5qTobeak6G3mpOht5qTobeak6G3mpOht5qTobeak6G3mpOht5qTobeak6G3mpOht5qTobeak6G3mpOht5qTobeak6G3mpOht5qTobeak6G3mpOht5qTobeak6G3mpOht5qTobeak6G3mpOht5qTobeak6G3mpOht5qTobeak6G3mpOht5qTobeak6G3mpOht5qTobeak6G3mpOht5qTobeak6G3mpOht5qTobeak6G3mpOht5qTobeaEwX6rWoKFV5xWDdTzHn4MbII5pomSkAZrxSTsUaGDutmijkPP0YWwVzTRAko45ViMtbI0GHdTDHn4cfIIphrmigBZbxSTMYaGTqsmynmPPwYWQRzTRMloIxXislYI0OHdTPFnIcfI4tgrmmiBJTxSjEZa2TosG6mmPPwY2QRzDVNlIAyXikmY40MHdbNFHMefowsgrmmiRJQxivFZKyRocO6mWLOw4+RRTDXNFECynilmIw1MnRYN1PMefgxsgjmmiZKQBmvFJOxRoYO62aKOQ8/RhbBXNNECSjjlWIy1sjQYd1MMefhx8gimGuaKAFlvFJMxhoZOqybKeY8/BhZBHNNEyWgjFeKyVgjQ4d1M8Wchx8ji2CuaaIElPFKMRlrZOiwbqaY8/BjZBHMNU2UgDJeKSZjjQwd1s0Ucx5+jCyCuaaJElDGK8WE35fAOgYbcTErZkAuQ4WJUa8HAXPLifYlsDb0uqjXg4C55UT7Elgbel3U60HA3HKifQmsDb0u6vUgYG450b4E1oZeF/V6EDC3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H2Rxzduffuc9a973lq8k9J9aQupNFj8bkAH923a/fLtvzlZq1RvO0rpi73e7njHbVG0i9IfvOl/cHZ/0hys+rugzr33S/PhP7Xua/u7NffeBevMLF8983wml+sjc4+u73jN00/fMVmsp9IevO6oVV7939ziP3siPvDmqTYR++0O9Tvzhp7/2s3nnL3vnbzzmbsdu3WDfp7gOQP+SBeRPevoXc0rFNf9HUQ4+6tM555dCn6ddHzhyoxcfjt9fF20k9Ff++H988yevD146/Ikl73tJQ3/JDiA3uetDnn/+Naphnn3ghife+nsOPfXV/y/v/Nd+fluvi5d60fE3OHDMsTe97emPftlm/u2RThsJfRVd9L73vu8DH/7YZy6V4W6JZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreZk6K3mZOit5mToreb0/wFX4AvHtQbUJAAAAABJRU5ErkJggg=="
                    alt="pay">
            </modal>
            <modal class="phone" name="phone" height="auto" width="300" reset adaptive>
                <div class="title">
                    在其他设备上使用
                </div>
                <img :src="qrcodeUrl" alt="pay">
            </modal>
            <modal class="share" name="share" height="auto" width="300" reset adaptive>
                <div class="title">
                    分享当前工具到
                </div>
                <div class="list">
                    <a :href="`http://connect.qq.com/widget/shareqq/index.html?url=${shareData.url}&desc=${shareData.title}&pics=${shareData.pic}`"
                        target="_blank" rel="noopener noreferrer">QQ</a>
                    <a :href="`http://qr.liantu.com/api.php?text=${shareData.url}`" target="_blank"
                        rel="noopener noreferrer">微信</a>
                    <a :href="`http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${shareData.url}&title=${shareData.title}&pics${shareData.pic}=&summary=${shareData.content}`"
                        target="_blank" rel="noopener noreferrer">QQ空间</a>
                    <a :href="`http://service.weibo.com/share/share.php?url=${shareData.url}&title=${shareData.title}&pic=${shareData.pic}&searchPic=false`"
                        target="_blank" rel="noopener noreferrer">微博</a>
                    <a :href="`http://www.douban.com/share/service?href=${shareData.url}&name=${shareData.title}&text=${shareData.content}&image=${shareData.pic}`"
                        target="_blank" rel="noopener noreferrer">豆瓣</a>
                    <a :href="`http://widget.renren.com/dialog/share?resourceUrl=${shareData.url}&srcUrl=${shareData.url}&title=${shareData.title}&description=${shareData.content}`"
                        target="_blank" rel="noopener noreferrer">人人</a>
                    <a :href="`https://twitter.com/intent/tweet?text=${shareData.title}&url=${shareData.url}`"
                        target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a :href="`https://www.facebook.com/sharer/sharer.php?u=${shareData.url}&t=${shareData.title}&pic=${shareData.pic}`"
                        target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a :href="`https://www.linkedin.com/shareArticle?title=${shareData.title}&summary=${shareData.content}&mini=true&url=${shareData.url}&ro=true`"
                        target="_blank" rel="noopener noreferrer">Linkedin</a>
                </div>
            </modal>
        </client-only>
    </div>
</template>

<script>
import QR from 'qr-image';
import _ from 'lodash';
import Dynamic from './Dynamic';

export default {
    name: 'FloatBtn',
    components: {
        Dynamic
    },
    data() {
        return {
            qrcodeUrl: ''
        };
    },
    computed: {
        iframeText() {
            return `<span style="color: #a1a8b5;">&lt;</span><span style="color: rgb(224, 108, 117);">iframe</span> <span style="color: rgb(209, 154, 102);">src</span><span style="color: #a1a8b5;">=</span><span style="color: rgb(152, 195, 121);">"${
                this.$store.state.env.url
            }${
                this.$route.path
            }"</span> <span style="color: rgb(209, 154, 102);">width</span><span style="color: #a1a8b5;">=</span><span style="color: rgb(152, 195, 121);">"100%"</span> <span style="color: rgb(209, 154, 102);">height</span><span style="color: #a1a8b5;">=</span><span style="color: rgb(152, 195, 121);">"400px"</span> <span style="color: rgb(209, 154, 102);">scrolling</span><span style="color: #a1a8b5;">=</span><span style="color: rgb(152, 195, 121);">"no"</span> <span style="color: rgb(209, 154, 102);">style</span><span style="color: #a1a8b5;">=</span><span style="color: rgb(152, 195, 121);">"border:0px;"</span><span style="color: #a1a8b5;">&gt;</span><span style="color: #a1a8b5;">&lt;</span><span style="color: #a1a8b5;">/</span><span style="color: rgb(224, 108, 117);">iframe</span><span style="color: #a1a8b5;">&gt;</span>`;
        },
        collected() {
            const path = this.$route.path;
            let flag = this.$store.state.setting.favorites.indexOf(path);
            return flag !== -1;
        },
        shareData() {
            if (this.$route.path === '/') return {};
            if (!this.$store.state.currentTool) return {};
            let description = this.$store.state.currentTool.head.meta.filter(
                e => e.description
            );
            if (description.length) {
                description = description[0].description;
            }
            return {
                url: process.env.url + this.$route.path,
                title: this.$store.state.currentTool.name,
                content: description,
                pic: process.env.url + '/icon.png'
            };
        }
    },
    methods: {
        collect() {
            const path = this.$route.path;
            if (path === '/') {
                return false;
            }
            let favorites = _.chain(this.$store.state.setting.favorites);
            let flag = favorites.indexOf(path).value();
            if (flag === -1) {
                favorites.push(path).value();
                this.$noty.success('收藏成功');
            } else {
                favorites.pull(path).value();
                this.$noty.success('取消收藏成功');
            }
            this.$store.commit('SET_STORE', {
                key: 'setting.favorites',
                value: favorites.value()
            });
        },
        viewInPhone() {
            const QRData = QR.imageSync(process.env.url + this.$route.path, {
                type: 'jpg',
                size: 10,
                margin: 0
            });
            this.qrcodeUrl =
                `data:image/jpg;base64,` + QRData.toString('base64');
            this.$modal.show('phone');
        },
        share() {
            this.$modal.show('share');
        }
    }
};
</script>


<style lang="scss">
.float-btn {
    position: relative;
    z-index: 999;
    position: fixed;
    right: 20px;
    bottom: 30px;
    &:hover {
        ul {
            opacity: 1;
        }
    }
    .code {
        pre {
            margin-bottom: 0;
            margin-top: 0;
            border: none;
            background-color: #282c34;
        }
    }
    ul {
        margin: 0 auto;
        padding: 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        opacity: 0;
        transition: all 0.3s ease;
        @media (max-width: 600px) {
            display: none;
        }
        li {
            cursor: pointer;
            list-style: none;
            margin-bottom: 15px;
            padding: 0;
            font-size: 25px;
            background-color: var(--theme);
            color: #ffffff;
            width: 40px;
            height: 40px;
            box-sizing: border-box;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .main {
        cursor: pointer;
        width: 55px;
        height: 55px;
        background-color: var(--theme);
        border-radius: 50%;
        box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06),
            1px 3px 8px rgba(39, 44, 49, 0.03);
        display: flex;
        align-items: center;
        justify-content: center;
        i {
            font-size: 20px;
            color: #eeeeee;
        }
    }
    .title {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        margin-top: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #d8d8d8;
        color: #222831;
    }
    .pay,
    .phone {
        img {
            padding: 20px;
            box-sizing: border-box;
            width: 100%;
        }
    }
    .share {
        .list {
            padding: 8px;
            a {
                display: inline-block;
                margin: 8px;
                font-size: 18px;
            }
        }
    }
}
</style>
