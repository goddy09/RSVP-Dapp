// Automatically generated with Reach 0.1.11 (27cb9643)
/* eslint-disable */
export const _version = '0.1.11';
export const _versionHash = '0.1.11 (27cb9643)';
export const _backendVersion = 19;

export function getExports(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getEvents(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getViews(s, viewlib) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_UInt;
  
  return {
    infos: {
      },
    views: {
      1: [ctc0, ctc1, ctc1, ctc1],
      5: [ctc0, ctc1, ctc1, ctc0, ctc1, ctc1, ctc1]
      }
    };
  
  };
export function _getMaps(s) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Tuple([]);
  return {
    mapDataTy: ctc0
    };
  };
export async function Alice(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Alice expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Alice expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_UInt;
  const ctc1 = stdlib.T_Null;
  const ctc2 = stdlib.T_Address;
  
  
  const v205 = stdlib.protect(ctc0, interact.deadline, 'for Alice\'s interact field deadline');
  const v206 = stdlib.protect(ctc0, interact.eventFee, 'for Alice\'s interact field eventFee');
  
  const txn1 = await (ctc.sendrecv({
    args: [v206, v205],
    evt_cnt: 2,
    funcNum: 0,
    lct: stdlib.checkedBigNumberify('./index.rsh:49:9:dot', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc0, ctc0],
    pay: [v206, []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v210, v211], secs: v213, time: v212, didSend: v56, from: v209 } = txn1;
      
      sim_r.txns.push({
        amt: v210,
        kind: 'to',
        tok: undefined /* Nothing */
        });
      const v222 = stdlib.safeAdd(v212, v211);
      sim_r.isHalt = false;
      
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [ctc0, ctc0],
    waitIfNotPresent: false
    }));
  const {data: [v210, v211], secs: v213, time: v212, didSend: v56, from: v209 } = txn1;
  ;
  const v222 = stdlib.safeAdd(v212, v211);
  const txn2 = await (ctc.recv({
    didSend: false,
    evt_cnt: 0,
    funcNum: 1,
    out_tys: [],
    timeoutAt: ['time', v222],
    waitIfNotPresent: false
    }));
  if (txn2.didTimeout) {
    const txn3 = await (ctc.sendrecv({
      args: [v209, v210, v211, v222],
      evt_cnt: 0,
      funcNum: 2,
      lct: v212,
      onlyIf: true,
      out_tys: [],
      pay: [stdlib.checkedBigNumberify('reach standard library:197:11:decimal', stdlib.UInt_max, '0'), []],
      sim_p: (async (txn3) => {
        const sim_r = { txns: [], mapRefs: [], maps: [] };
        let sim_txn_ctr = stdlib.UInt_max;
        const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
        
        
        const {data: [], secs: v304, time: v303, didSend: v158, from: v302 } = txn3;
        
        ;
        sim_r.txns.push({
          kind: 'from',
          to: v209,
          tok: undefined /* Nothing */
          });
        sim_r.txns.push({
          kind: 'halt',
          tok: undefined /* Nothing */
          })
        sim_r.isHalt = true;
        
        return sim_r;
        }),
      soloSend: false,
      timeoutAt: undefined /* mto */,
      tys: [ctc2, ctc0, ctc0, ctc0],
      waitIfNotPresent: false
      }));
    const {data: [], secs: v304, time: v303, didSend: v158, from: v302 } = txn3;
    ;
    ;
    stdlib.protect(ctc1, await interact.informTimeout(), {
      at: './index.rsh:41:29:application',
      fs: ['at ./index.rsh:40:9:application call to [unknown function] (defined at: ./index.rsh:40:27:function exp)', 'at reach standard library:200:8:application call to "after" (defined at: ./index.rsh:39:28:function exp)', 'at ./index.rsh:57:51:application call to "closeTo" (defined at: reach standard library:195:8:function exp)'],
      msg: 'informTimeout',
      who: 'Alice'
      });
    
    return;
    
    }
  else {
    const {data: [], secs: v228, time: v227, didSend: v65, from: v226 } = txn2;
    const v230 = stdlib.safeAdd(v210, v210);
    ;
    const v234 = stdlib.safeSub(v230, v210);
    ;
    let v235 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '1');
    let v236 = v227;
    let v243 = v234;
    
    while (await (async () => {
      const v250 = stdlib.eq(v235, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '1'));
      
      return v250;})()) {
      const v257 = stdlib.safeAdd(v236, v211);
      const v261 = stdlib.protect(ctc0, await interact.approveInvitee(), {
        at: './index.rsh:66:49:application',
        fs: ['at ./index.rsh:65:15:application call to [unknown function] (defined at: ./index.rsh:65:19:function exp)'],
        msg: 'approveInvitee',
        who: 'Alice'
        });
      
      const txn3 = await (ctc.sendrecv({
        args: [v209, v210, v211, v226, v235, v243, v257, v261],
        evt_cnt: 1,
        funcNum: 4,
        lct: v236,
        onlyIf: true,
        out_tys: [ctc0],
        pay: [stdlib.checkedBigNumberify('./index.rsh:69:11:decimal', stdlib.UInt_max, '0'), []],
        sim_p: (async (txn3) => {
          const sim_r = { txns: [], mapRefs: [], maps: [] };
          let sim_txn_ctr = stdlib.UInt_max;
          const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
          
          
          const {data: [v263], secs: v265, time: v264, didSend: v90, from: v262 } = txn3;
          
          ;
          const v267 = stdlib.eq(v263, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '0'));
          if (v267) {
            const cv235 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '0');
            const cv236 = v264;
            const cv243 = v243;
            
            await (async () => {
              const v235 = cv235;
              const v236 = cv236;
              const v243 = cv243;
              
              if (await (async () => {
                const v250 = stdlib.eq(v235, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '1'));
                
                return v250;})()) {
                const v257 = stdlib.safeAdd(v236, v211);
                sim_r.isHalt = false;
                }
              else {
                const v287 = stdlib.eq(v235, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '2'));
                const v291 = v287 ? v209 : v226;
                sim_r.txns.push({
                  kind: 'from',
                  to: v291,
                  tok: undefined /* Nothing */
                  });
                sim_r.txns.push({
                  kind: 'halt',
                  tok: undefined /* Nothing */
                  })
                sim_r.isHalt = true;
                }})();}
          else {
            const v268 = stdlib.eq(v263, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '2'));
            if (v268) {
              const cv235 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '2');
              const cv236 = v264;
              const cv243 = v243;
              
              await (async () => {
                const v235 = cv235;
                const v236 = cv236;
                const v243 = cv243;
                
                if (await (async () => {
                  const v250 = stdlib.eq(v235, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '1'));
                  
                  return v250;})()) {
                  const v257 = stdlib.safeAdd(v236, v211);
                  sim_r.isHalt = false;
                  }
                else {
                  const v287 = stdlib.eq(v235, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '2'));
                  const v291 = v287 ? v209 : v226;
                  sim_r.txns.push({
                    kind: 'from',
                    to: v291,
                    tok: undefined /* Nothing */
                    });
                  sim_r.txns.push({
                    kind: 'halt',
                    tok: undefined /* Nothing */
                    })
                  sim_r.isHalt = true;
                  }})();}
            else {
              const cv235 = v235;
              const cv236 = v264;
              const cv243 = v243;
              
              await (async () => {
                const v235 = cv235;
                const v236 = cv236;
                const v243 = cv243;
                
                if (await (async () => {
                  const v250 = stdlib.eq(v235, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '1'));
                  
                  return v250;})()) {
                  const v257 = stdlib.safeAdd(v236, v211);
                  sim_r.isHalt = false;
                  }
                else {
                  const v287 = stdlib.eq(v235, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '2'));
                  const v291 = v287 ? v209 : v226;
                  sim_r.txns.push({
                    kind: 'from',
                    to: v291,
                    tok: undefined /* Nothing */
                    });
                  sim_r.txns.push({
                    kind: 'halt',
                    tok: undefined /* Nothing */
                    })
                  sim_r.isHalt = true;
                  }})();}}
          return sim_r;
          }),
        soloSend: true,
        timeoutAt: ['time', v257],
        tys: [ctc2, ctc0, ctc0, ctc2, ctc0, ctc0, ctc0, ctc0],
        waitIfNotPresent: false
        }));
      if (txn3.didTimeout) {
        const txn4 = await (ctc.sendrecv({
          args: [v209, v210, v211, v226, v235, v243, v257],
          evt_cnt: 0,
          funcNum: 5,
          lct: v236,
          onlyIf: true,
          out_tys: [],
          pay: [stdlib.checkedBigNumberify('reach standard library:197:11:decimal', stdlib.UInt_max, '0'), []],
          sim_p: (async (txn4) => {
            const sim_r = { txns: [], mapRefs: [], maps: [] };
            let sim_txn_ctr = stdlib.UInt_max;
            const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
            
            
            const {data: [], secs: v271, time: v270, didSend: v112, from: v269 } = txn4;
            
            ;
            sim_r.txns.push({
              kind: 'from',
              to: v226,
              tok: undefined /* Nothing */
              });
            sim_r.txns.push({
              kind: 'halt',
              tok: undefined /* Nothing */
              })
            sim_r.isHalt = true;
            
            return sim_r;
            }),
          soloSend: false,
          timeoutAt: undefined /* mto */,
          tys: [ctc2, ctc0, ctc0, ctc2, ctc0, ctc0, ctc0],
          waitIfNotPresent: false
          }));
        const {data: [], secs: v271, time: v270, didSend: v112, from: v269 } = txn4;
        ;
        const v272 = stdlib.addressEq(v209, v269);
        const v273 = stdlib.addressEq(v226, v269);
        const v274 = v272 ? true : v273;
        stdlib.assert(v274, {
          at: 'reach standard library:197:11:dot',
          fs: ['at ./index.rsh:70:53:application call to "closeTo" (defined at: reach standard library:195:8:function exp)'],
          msg: 'sender correct',
          who: 'Alice'
          });
        ;
        stdlib.protect(ctc1, await interact.informTimeout(), {
          at: './index.rsh:41:29:application',
          fs: ['at ./index.rsh:40:9:application call to [unknown function] (defined at: ./index.rsh:40:27:function exp)', 'at reach standard library:200:8:application call to "after" (defined at: ./index.rsh:39:28:function exp)', 'at ./index.rsh:70:53:application call to "closeTo" (defined at: reach standard library:195:8:function exp)'],
          msg: 'informTimeout',
          who: 'Alice'
          });
        
        return;
        
        }
      else {
        const {data: [v263], secs: v265, time: v264, didSend: v90, from: v262 } = txn3;
        ;
        const v266 = stdlib.addressEq(v209, v262);
        stdlib.assert(v266, {
          at: './index.rsh:69:11:dot',
          fs: [],
          msg: 'sender correct',
          who: 'Alice'
          });
        const v267 = stdlib.eq(v263, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '0'));
        if (v267) {
          const cv235 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '0');
          const cv236 = v264;
          const cv243 = v243;
          
          v235 = cv235;
          v236 = cv236;
          v243 = cv243;
          
          continue;}
        else {
          const v268 = stdlib.eq(v263, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '2'));
          if (v268) {
            const cv235 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '2');
            const cv236 = v264;
            const cv243 = v243;
            
            v235 = cv235;
            v236 = cv236;
            v243 = cv243;
            
            continue;}
          else {
            const cv235 = v235;
            const cv236 = v264;
            const cv243 = v243;
            
            v235 = cv235;
            v236 = cv236;
            v243 = cv243;
            
            continue;}}}
      
      }
    const v287 = stdlib.eq(v235, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '2'));
    const v291 = v287 ? v209 : v226;
    ;
    stdlib.protect(ctc1, await interact.seeOutcome(v235), {
      at: './index.rsh:90:24:application',
      fs: ['at ./index.rsh:89:7:application call to [unknown function] (defined at: ./index.rsh:89:25:function exp)'],
      msg: 'seeOutcome',
      who: 'Alice'
      });
    
    return;
    }
  
  
  
  };
export async function Bob(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Bob expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Bob expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_UInt;
  const ctc1 = stdlib.T_Null;
  const ctc2 = stdlib.T_Address;
  
  
  const txn1 = await (ctc.recv({
    didSend: false,
    evt_cnt: 2,
    funcNum: 0,
    out_tys: [ctc0, ctc0],
    timeoutAt: undefined /* mto */,
    waitIfNotPresent: false
    }));
  const {data: [v210, v211], secs: v213, time: v212, didSend: v56, from: v209 } = txn1;
  ;
  const v222 = stdlib.safeAdd(v212, v211);
  stdlib.protect(ctc1, await interact.acceptEventFee(v210), {
    at: './index.rsh:54:28:application',
    fs: ['at ./index.rsh:53:11:application call to [unknown function] (defined at: ./index.rsh:53:15:function exp)'],
    msg: 'acceptEventFee',
    who: 'Bob'
    });
  
  const txn2 = await (ctc.sendrecv({
    args: [v209, v210, v211, v222],
    evt_cnt: 0,
    funcNum: 1,
    lct: v212,
    onlyIf: true,
    out_tys: [],
    pay: [v210, []],
    sim_p: (async (txn2) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [], secs: v228, time: v227, didSend: v65, from: v226 } = txn2;
      
      const v230 = stdlib.safeAdd(v210, v210);
      sim_r.txns.push({
        amt: v210,
        kind: 'to',
        tok: undefined /* Nothing */
        });
      const v234 = stdlib.safeSub(v230, v210);
      sim_r.txns.push({
        kind: 'from',
        to: v209,
        tok: undefined /* Nothing */
        });
      const v235 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '1');
      const v236 = v227;
      const v243 = v234;
      
      if (await (async () => {
        const v250 = stdlib.eq(v235, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '1'));
        
        return v250;})()) {
        const v257 = stdlib.safeAdd(v236, v211);
        sim_r.isHalt = false;
        }
      else {
        const v287 = stdlib.eq(v235, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '2'));
        const v291 = v287 ? v209 : v226;
        sim_r.txns.push({
          kind: 'from',
          to: v291,
          tok: undefined /* Nothing */
          });
        sim_r.txns.push({
          kind: 'halt',
          tok: undefined /* Nothing */
          })
        sim_r.isHalt = true;
        }
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: ['time', v222],
    tys: [ctc2, ctc0, ctc0, ctc0],
    waitIfNotPresent: false
    }));
  if (txn2.didTimeout) {
    const txn3 = await (ctc.sendrecv({
      args: [v209, v210, v211, v222],
      evt_cnt: 0,
      funcNum: 2,
      lct: v212,
      onlyIf: true,
      out_tys: [],
      pay: [stdlib.checkedBigNumberify('reach standard library:197:11:decimal', stdlib.UInt_max, '0'), []],
      sim_p: (async (txn3) => {
        const sim_r = { txns: [], mapRefs: [], maps: [] };
        let sim_txn_ctr = stdlib.UInt_max;
        const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
        
        
        const {data: [], secs: v304, time: v303, didSend: v158, from: v302 } = txn3;
        
        ;
        sim_r.txns.push({
          kind: 'from',
          to: v209,
          tok: undefined /* Nothing */
          });
        sim_r.txns.push({
          kind: 'halt',
          tok: undefined /* Nothing */
          })
        sim_r.isHalt = true;
        
        return sim_r;
        }),
      soloSend: false,
      timeoutAt: undefined /* mto */,
      tys: [ctc2, ctc0, ctc0, ctc0],
      waitIfNotPresent: false
      }));
    const {data: [], secs: v304, time: v303, didSend: v158, from: v302 } = txn3;
    ;
    ;
    stdlib.protect(ctc1, await interact.informTimeout(), {
      at: './index.rsh:41:29:application',
      fs: ['at ./index.rsh:40:9:application call to [unknown function] (defined at: ./index.rsh:40:27:function exp)', 'at reach standard library:200:8:application call to "after" (defined at: ./index.rsh:39:28:function exp)', 'at ./index.rsh:57:51:application call to "closeTo" (defined at: reach standard library:195:8:function exp)'],
      msg: 'informTimeout',
      who: 'Bob'
      });
    
    return;
    
    }
  else {
    const {data: [], secs: v228, time: v227, didSend: v65, from: v226 } = txn2;
    const v230 = stdlib.safeAdd(v210, v210);
    ;
    const v234 = stdlib.safeSub(v230, v210);
    ;
    let v235 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '1');
    let v236 = v227;
    let v243 = v234;
    
    while (await (async () => {
      const v250 = stdlib.eq(v235, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '1'));
      
      return v250;})()) {
      const v257 = stdlib.safeAdd(v236, v211);
      const txn3 = await (ctc.recv({
        didSend: false,
        evt_cnt: 1,
        funcNum: 4,
        out_tys: [ctc0],
        timeoutAt: ['time', v257],
        waitIfNotPresent: false
        }));
      if (txn3.didTimeout) {
        const txn4 = await (ctc.sendrecv({
          args: [v209, v210, v211, v226, v235, v243, v257],
          evt_cnt: 0,
          funcNum: 5,
          lct: v236,
          onlyIf: true,
          out_tys: [],
          pay: [stdlib.checkedBigNumberify('reach standard library:197:11:decimal', stdlib.UInt_max, '0'), []],
          sim_p: (async (txn4) => {
            const sim_r = { txns: [], mapRefs: [], maps: [] };
            let sim_txn_ctr = stdlib.UInt_max;
            const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
            
            
            const {data: [], secs: v271, time: v270, didSend: v112, from: v269 } = txn4;
            
            ;
            sim_r.txns.push({
              kind: 'from',
              to: v226,
              tok: undefined /* Nothing */
              });
            sim_r.txns.push({
              kind: 'halt',
              tok: undefined /* Nothing */
              })
            sim_r.isHalt = true;
            
            return sim_r;
            }),
          soloSend: false,
          timeoutAt: undefined /* mto */,
          tys: [ctc2, ctc0, ctc0, ctc2, ctc0, ctc0, ctc0],
          waitIfNotPresent: false
          }));
        const {data: [], secs: v271, time: v270, didSend: v112, from: v269 } = txn4;
        ;
        const v272 = stdlib.addressEq(v209, v269);
        const v273 = stdlib.addressEq(v226, v269);
        const v274 = v272 ? true : v273;
        stdlib.assert(v274, {
          at: 'reach standard library:197:11:dot',
          fs: ['at ./index.rsh:70:53:application call to "closeTo" (defined at: reach standard library:195:8:function exp)'],
          msg: 'sender correct',
          who: 'Bob'
          });
        ;
        stdlib.protect(ctc1, await interact.informTimeout(), {
          at: './index.rsh:41:29:application',
          fs: ['at ./index.rsh:40:9:application call to [unknown function] (defined at: ./index.rsh:40:27:function exp)', 'at reach standard library:200:8:application call to "after" (defined at: ./index.rsh:39:28:function exp)', 'at ./index.rsh:70:53:application call to "closeTo" (defined at: reach standard library:195:8:function exp)'],
          msg: 'informTimeout',
          who: 'Bob'
          });
        
        return;
        
        }
      else {
        const {data: [v263], secs: v265, time: v264, didSend: v90, from: v262 } = txn3;
        ;
        const v266 = stdlib.addressEq(v209, v262);
        stdlib.assert(v266, {
          at: './index.rsh:69:11:dot',
          fs: [],
          msg: 'sender correct',
          who: 'Bob'
          });
        const v267 = stdlib.eq(v263, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '0'));
        if (v267) {
          const cv235 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '0');
          const cv236 = v264;
          const cv243 = v243;
          
          v235 = cv235;
          v236 = cv236;
          v243 = cv243;
          
          continue;}
        else {
          const v268 = stdlib.eq(v263, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '2'));
          if (v268) {
            const cv235 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '2');
            const cv236 = v264;
            const cv243 = v243;
            
            v235 = cv235;
            v236 = cv236;
            v243 = cv243;
            
            continue;}
          else {
            const cv235 = v235;
            const cv236 = v264;
            const cv243 = v243;
            
            v235 = cv235;
            v236 = cv236;
            v243 = cv243;
            
            continue;}}}
      
      }
    const v287 = stdlib.eq(v235, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '2'));
    const v291 = v287 ? v209 : v226;
    ;
    stdlib.protect(ctc1, await interact.seeOutcome(v235), {
      at: './index.rsh:90:24:application',
      fs: ['at ./index.rsh:89:7:application call to [unknown function] (defined at: ./index.rsh:89:25:function exp)'],
      msg: 'seeOutcome',
      who: 'Bob'
      });
    
    return;
    }
  
  
  
  };
const _ALGO = {
  ABI: {
    impure: [],
    pure: [],
    sigs: []
    },
  appApproval: `BiAKAAECBSAIYFgoMCYCAQAAIjUAMRhBAtUpZEkiWzUBIQVbNQI2GgAXSUEAByI1BCM1BgA2GgIXNQQ2GgM2GgEXSSQMQAEzSYEEDEAA7EklDEAAUiUSRCU0ARJENARJIhJMNAISEUQoZEk1A1cwIDX/gATMmZJcsDIGNAMhBlsPRDQDVwAgMQASNP8xABIRRLEisgE0AyEHW7III7IQNP+yB7NCAflIJTQBEkQ0BEkiEkw0AhIRRChkSTUDSUpJVwAgNf8hBFs1/iEIWzX9VzAgNfwhB1s1+0k1BRc1+oAE+YuveDT6FlCwMgY0AyEGWwxENP8xABJENPoiEkEAEDT/NP40/TT8IjIGNPtCAS80+iQSQQAQNP80/jT9NPwkMgY0+0IBGDT/NP40/TT8NAOBUFsyBjT7QgEEJBJEIzQBEkQ0BEkiEkw0AhIRRChkNQOABEGxQE2wMgY0AyEJWw9EsSKyATQDIQRbsggjshA0A1cAILIHs0IBJUkjDEAAXkgjNAESRDQESSISTDQCEhFEKGRJNQNJVwAgNf8hBFs1/oAEmouRdLAyBjQDIQlbDEQ0/ogBVbEisgE0/rIII7IQNP+yB7M0/zT+NAMhCFsxACMyBjT+SQg0/glCAGBIgaCNBogBJSI0ARJENARJIhJMNAISEURJNQVJIls1/yEFWzX+gASs0R/DNP8WUDT+FlCwNP+IAPQyBjT+CDX9MQA0/xZQNP4WUDT9FlAoSwFXADhnSCM1ATIGNQJCAHw1/zX+Nf01/DX7Nfo1+TT9IxJBADI0/jT7CDX4NPk0+hZQNPsWUDT8UDT9FlA0/xZQNPgWUChLAVcAaGdIJTUBMgY1AkIANbEisgE0+rIII7IQNPw0+TT9JBJNsgezQgAAMRklEkSxIrIBIrIII7IQMgmyCTIKsgezQgAFMRkiEkQpNAEWNAIWUGc0BkEACoAEFR98dTQHULA0AEkjCDIEEkQxFhJEI0MxGSISREL/3yIxNBJEJDE1EkQiMTYSRCIxNxJEIjUBIjUCQv+vNABJSiMINQA4BzIKEkQ4ECMSRDgIEkSJ`,
  appClear: `Bg==`,
  companionInfo: null,
  extraPages: 0,
  mapDataKeys: 0,
  mapDataSize: 0,
  stateKeys: 1,
  stateSize: 104,
  unsupported: [],
  version: 10,
  warnings: []
  };
const _ETH = {
  ABI: `[
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v210",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v211",
                "type": "uint256"
              }
            ],
            "internalType": "struct T1",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T2",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "msg",
        "type": "uint256"
      }
    ],
    "name": "ReachError",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v210",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v211",
                "type": "uint256"
              }
            ],
            "internalType": "struct T1",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T2",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e0",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e1",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e2",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v263",
                "type": "uint256"
              }
            ],
            "internalType": "struct T9",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T10",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e4",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e5",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "_reachCreationTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentState",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m1",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m2",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v263",
                "type": "uint256"
              }
            ],
            "internalType": "struct T9",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T10",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m4",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m5",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]`,
  Bytecode: `0x608060405260405162001318380380620013188339810160408190526200002691620002a9565b6000808055436003556040805160208082018352928152815133815284518185015284840151805182850152909301516060840152905190917fa736757a943474ef5983bb0422ab3a1e64bcd39e99635f4430c7765118231f95919081900360800190a16020820151516200009f90341460076200014a565b620000b9438360200151602001516200017560201b60201c565b81526040805160808082018352600060208084018281528486018381526060808701858152338089528b860180515186525186015184528a5182526001968790554390965588518086019690965292518589015290519084015251828401528451808303909301835260a090910190935280519192620001409260029290910190620001cc565b505050506200036d565b81620001715760405163100960cb60e01b8152600481018290526024015b60405180910390fd5b5050565b60008262000184838262000309565b9150811015620001c65760405162461bcd60e51b815260206004820152600c60248201526b616464206f766572666c6f7760a01b604482015260640162000168565b92915050565b828054620001da9062000330565b90600052602060002090601f016020900481019282620001fe576000855562000249565b82601f106200021957805160ff191683800117855562000249565b8280016001018555821562000249579182015b82811115620002495782518255916020019190600101906200022c565b50620002579291506200025b565b5090565b5b808211156200025757600081556001016200025c565b604080519081016001600160401b0381118282101715620002a357634e487b7160e01b600052604160045260246000fd5b60405290565b60008183036060811215620002bd57600080fd5b620002c762000272565b835181526040601f1983011215620002de57600080fd5b620002e862000272565b60208581015182526040909501518582015293810193909352509092915050565b600082198211156200032b57634e487b7160e01b600052601160045260246000fd5b500190565b600181811c908216806200034557607f821691505b602082108114156200036757634e487b7160e01b600052602260045260246000fd5b50919050565b610f9b806200037d6000396000f3fe60806040526004361061006e5760003560e01c8063832307571161004b57806383230757146100c15780638e314769146100d6578063a209ad4e146100e9578063ab53f2c6146100fc57005b80631e93b0f1146100775780632c10a1591461009b5780637eea518c146100ae57005b3661007557005b005b34801561008357600080fd5b506003545b6040519081526020015b60405180910390f35b6100756100a9366004610cfb565b61011f565b6100756100bc366004610cfb565b610302565b3480156100cd57600080fd5b50600154610088565b6100756100e4366004610cfb565b610480565b6100756100f7366004610cfb565b61061b565b34801561010857600080fd5b506101116108ae565b604051610092929190610d1e565b61012f600160005414600961094b565b6101498135158061014257506001548235145b600a61094b565b60008080556002805461015b90610d7b565b80601f016020809104026020016040519081016040528092919081815260200182805461018790610d7b565b80156101d45780601f106101a9576101008083540402835291602001916101d4565b820191906000526020600020905b8154815290600101906020018083116101b757829003601f168201915b50505050508060200190518101906101ec9190610dcc565b90506101ff81606001514310600b61094b565b7f400d21ea4e4a5e28b4ae5f0f476c201fc8036473fcf7c8cd252f38698020b4f13383604051610230929190610e45565b60405180910390a161024981602001513414600861094b565b805160208201516040516001600160a01b039092169181156108fc0291906000818181858888f19350505050158015610286573d6000803e3d6000fd5b5061028f610bb4565b815181516001600160a01b0390911690526020808301805183518301526040808501518451909101528251336060909101528183018051600190525143920191909152516102eb906102e19080610971565b83602001516109c4565b6020820151604001526102fd81610a13565b505050565b610312600160005414600d61094b565b61032c8135158061032557506001548235145b600e61094b565b60008080556002805461033e90610d7b565b80601f016020809104026020016040519081016040528092919081815260200182805461036a90610d7b565b80156103b75780601f1061038c576101008083540402835291602001916103b7565b820191906000526020600020905b81548152906001019060200180831161039a57829003601f168201915b50505050508060200190518101906103cf9190610dcc565b90506103e38160600151431015600f61094b565b7f919263be6d51bec670ce110fb6a7df03fe323e3de4dade5355bccc6a4b06d9503383604051610414929190610e45565b60405180910390a16104283415600c61094b565b805160208201516040516001600160a01b039092169181156108fc0291906000818181858888f19350505050158015610465573d6000803e3d6000fd5b506000808055600181905561047c90600290610c0d565b5050565b610490600560005414601761094b565b6104aa813515806104a357506001548235145b601861094b565b6000808055600280546104bc90610d7b565b80601f01602080910402602001604051908101604052809291908181526020018280546104e890610d7b565b80156105355780601f1061050a57610100808354040283529160200191610535565b820191906000526020600020905b81548152906001019060200180831161051857829003601f168201915b505050505080602001905181019061054d9190610e82565b90506105618160c00151431015601961094b565b7fbe731e9f2a129299a212b8ec3ac324fa99671cd00a5a827cbd3d4fe6d7ad541d3383604051610592929190610e45565b60405180910390a16105a63415601561094b565b80516105da906001600160a01b031633146105d05760608201516001600160a01b031633146105d3565b60015b601661094b565b80606001516001600160a01b03166108fc8260a001519081150290604051600060405180830381858888f19350505050158015610465573d6000803e3d6000fd5b61062b600560005414601261094b565b6106458135158061063e57506001548235145b601361094b565b60008080556002805461065790610d7b565b80601f016020809104026020016040519081016040528092919081815260200182805461068390610d7b565b80156106d05780601f106106a5576101008083540402835291602001916106d0565b820191906000526020600020905b8154815290600101906020018083116106b357829003601f168201915b50505050508060200190518101906106e89190610e82565b90506106fb8160c001514310601461094b565b6040805133815283356020808301919091528401358183015290517f117ff0fc7909f539043dcba1a015e3c49852b86bcb1c87a6cfa653f771ccbdc09181900360600190a161074c3415601061094b565b8051610764906001600160a01b03163314601161094b565b60208201356107d257610775610bb4565b815181516001600160a01b039182169052602080840151835182015260408085015184518201526060808601518551941693019290925280830180516000905280514392019190915260a08401519051909101526102fd81610a13565b602082013560021415610844576107e7610bb4565b815181516001600160a01b039182169052602080840151835182015260408085015184518201526060808601518551941693019290925280830180516002905280514392019190915260a08401519051909101526102fd81610a13565b61084c610bb4565b815181516001600160a01b0391821690526020808401518351820152604080850151845182015260608086015185519416930192909252608084015181840180519190915280514392019190915260a08401519051909101526102fd81610a13565b6000606060005460028080546108c390610d7b565b80601f01602080910402602001604051908101604052809291908181526020018280546108ef90610d7b565b801561093c5780601f106109115761010080835404028352916020019161093c565b820191906000526020600020905b81548152906001019060200180831161091f57829003601f168201915b50505050509050915091509091565b8161047c5760405163100960cb60e01b8152600481018290526024015b60405180910390fd5b60008261097e8382610f36565b91508110156109be5760405162461bcd60e51b815260206004820152600c60248201526b616464206f766572666c6f7760a01b6044820152606401610968565b92915050565b6000826109d18382610f4e565b91508111156109be5760405162461bcd60e51b815260206004820152600e60248201526d1cdd58881ddc985c185c9bdd5b9960921b6044820152606401610968565b60408051602081019091526000815260208201515160011415610b5b57610a4a826020015160200151836000015160400151610971565b81526040805160e081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c08101919091528251516001600160a01b039081168083528451602090810151818501908152865160409081015181870190815288516060908101518716818901908152858b018051516080808c01918252915186015160a0808d019182528d5160c0808f0191825260056000554360015589519b8c019c909c529851978a0197909752945193880193909352905190971696850196909652945190830152925191810191909152905160e08201526101000160405160208183030381529060405260029080519060200190610b55929190610c4a565b50505050565b602082015151600214610b7357815160600151610b77565b8151515b8251602001516040516001600160a01b03929092169181156108fc0291906000818181858888f19350505050158015610465573d6000803e3d6000fd5b6040805160c0810182526000918101828152606082018390526080820183905260a08201929092529081908152602001610c0860405180606001604052806000815260200160008152602001600081525090565b905290565b508054610c1990610d7b565b6000825580601f10610c29575050565b601f016020900490600052602060002090810190610c479190610cce565b50565b828054610c5690610d7b565b90600052602060002090601f016020900481019282610c785760008555610cbe565b82601f10610c9157805160ff1916838001178555610cbe565b82800160010185558215610cbe579182015b82811115610cbe578251825591602001919060010190610ca3565b50610cca929150610cce565b5090565b5b80821115610cca5760008155600101610ccf565b600060408284031215610cf557600080fd5b50919050565b600060408284031215610d0d57600080fd5b610d178383610ce3565b9392505050565b82815260006020604081840152835180604085015260005b81811015610d5257858101830151858201606001528201610d36565b81811115610d64576000606083870101525b50601f01601f191692909201606001949350505050565b600181811c90821680610d8f57607f821691505b60208210811415610cf557634e487b7160e01b600052602260045260246000fd5b80516001600160a01b0381168114610dc757600080fd5b919050565b600060808284031215610dde57600080fd5b6040516080810181811067ffffffffffffffff82111715610e0f57634e487b7160e01b600052604160045260246000fd5b604052610e1b83610db0565b81526020830151602082015260408301516040820152606083015160608201528091505092915050565b6001600160a01b038316815281356020808301919091526060820190830135801515808214610e7357600080fd5b80604085015250509392505050565b600060e08284031215610e9457600080fd5b60405160e0810181811067ffffffffffffffff82111715610ec557634e487b7160e01b600052604160045260246000fd5b604052610ed183610db0565b81526020830151602082015260408301516040820152610ef360608401610db0565b60608201526080830151608082015260a083015160a082015260c083015160c08201528091505092915050565b634e487b7160e01b600052601160045260246000fd5b60008219821115610f4957610f49610f20565b500190565b600082821015610f6057610f60610f20565b50039056fea26469706673582212208f07c88f51a5c3a9f471567fd5767b973a720ed61d2cc14a0fa2be0cdb43684164736f6c634300080c0033`,
  BytecodeLen: 4888,
  Which: `oD`,
  version: 7,
  views: {
    }
  };
export const _stateSourceMap = {
  1: {
    at: './index.rsh:51:11:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  2: {
    at: 'reach standard library:199:11:after expr stmt semicolon',
    fs: ['at ./index.rsh:57:51:application call to "closeTo" (defined at: reach standard library:195:8:function exp)'],
    msg: null,
    who: 'Module'
    },
  4: {
    at: './index.rsh:87:11:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  5: {
    at: './index.rsh:63:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  6: {
    at: 'reach standard library:199:11:after expr stmt semicolon',
    fs: ['at ./index.rsh:70:53:application call to "closeTo" (defined at: reach standard library:195:8:function exp)'],
    msg: null,
    who: 'Module'
    }
  };
export const _Connectors = {
  ALGO: _ALGO,
  ETH: _ETH
  };
export const _Participants = {
  "Alice": Alice,
  "Bob": Bob
  };
export const _APIs = {
  };
