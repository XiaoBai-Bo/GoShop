 <template>
 	<div class="star star-24">
      <span class="star-item" v-for="(sc, index) in starClasses" :class="sc" :key="index"></span>
    </div>
</template>

<script>
	export default{
		props:{
			score:Number,
			size:Number
		},
		computed:{
			starClasses(){
				  /*
			      3.2: 3 + 0 + 2
			      3.5: 3 + 1 + 1
			       */
				const {score} =this
				const scs = []
				// 向scs中添加n个CLASS_ON
		        const scoreInteger = Math.floor(score)  //四舍五入得到后一位
		        //math.floor()  向下舍入
		        //math.round() 标准舍入
		        //math.ceil()  向上舍入
		        for (let i = 0; i < scoreInteger; i++) {
		          scs.push('on')
		        }
		        // 向scs中添加0/1个CLASS_HALF
		        if(score*10-scoreInteger*10>=5) {
		          scs.push('half')
		        }
		        // 向scs中添加n个CLASS_OFF
		        while(scs.length<5) {
		          scs.push('off')
		        }
		
		        return scs
		    }
		}
	}
</script>

<style lang="scss">
	.star.star-24 {
	    float: left;
	    width: 75px;
	    height: 30px;
	    line-height: 30px;
	    margin-right: 10px;
	    .star-item{
	    	float: left;
	    	width: 15px;
	    	height: 16px;
	    	display: block;
	    	margin-top: 7px;
	    }
	    .on{
	    	background-repeat: no-repeat;
	    	background-image: url(images/stars/star24_on@2x.png);
	    	background-size: 14px;
	    }
	    .half{
	    	background-repeat: no-repeat;
	    	background-image: url(images/stars/star24_half@2x.png);
	    	background-size: 14px;
	    }
	    .off{
	    	background-repeat: no-repeat;
	    	background-image: url(images/stars/star24_off@2x.png);
	    	background-size: 14px;
	    }
	}
</style>