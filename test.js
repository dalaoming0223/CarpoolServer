async function f1(){
  return 'hello'
}

const a = 1
// console.log(f1())
// console.log(a)


/**
 * try catch 有时候会捕捉不到异常
 */
function func1() {
    func2()
}


async function func2() {
  try {
    await func3()
  } catch (error) {
    console.log('是否捕捉到异常error')
  }

}


// function func3() {
//   try {
//     0/aaa
//   } catch (error) {
//       throw error
//   }
//   return 'success'
// }


function func3() {
  return new Promise((resolve, reject) => {
    setTimeout(function(){
      const r = Math.random()
      console.log(r)
      if(r < 0.5){
        reject('error')
      }
    })
  })
}

func1()