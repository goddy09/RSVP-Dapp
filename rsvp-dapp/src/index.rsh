'reach 0.1';

POST = {
  HostName: Bytes,
  event_name_and_time: Fun([Bytes], Null),
},

const error_messg = {
  error: "can not have empty event"
}

export const main = Reach.App(() => {

  const system = Participant("system"{
    ...error_messg,
    
  })
  const host = API("host",{
    ...POST

  })

  host.only(()=> {
    
    declassify(interact.event_name_and_time)
  })

  init();

  commit();
  if (host.publish() === Null){
    commit();
    system.publish()

  }else{
    commit()
    system.only(() =>{
      View("msg", {message: declassify(interact.error_messg)})

      wager = declassify(interact.wage)
      host.pay(wager)
    })
  }

  exit();
});