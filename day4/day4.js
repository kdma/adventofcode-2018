const fs = require("fs");
let p = __dirname+"\\input_4.txt";
const logEntries = fs.readFileSync(p, "utf-8").split("\r\n");
const LOG_SHIFT = "SHIFT";
const LOG_SLEEP = "SLEEP";
const LOG_WOKE = "WAKE";
const logs = [];

const getLogEntryType = (entry) =>{
    if(entry.includes("Guard"))
        return LOG_SHIFT;
    if(entry.includes("wakes"))
        return LOG_WOKE;
    if(entry.includes("falls"))
        return LOG_SLEEP;
    return "";
}

logEntries.forEach(logEntry => {
    let month = parseInt(logEntry.substr(6,2));
    let day = parseInt(logEntry.substr(9,2));
    let hour = parseInt(logEntry.substr(12,2));
    let minute = parseInt(logEntry.substr(15,2));
    let logType = getLogEntryType(logEntry);
    let key = new Date(2018, month, day, hour, minute).getTime();
    
    logs.push({
        key: key,
        entry: {
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            kind: logType,
            unparsed: logEntry
        }
    })
});

const timeTable = [];
logs.sort((a,b) => a.key - b.key);
for (let i = 0; i < logs.length; i++) {
    const logEntry = logs[i].entry;
    switch(logEntry.kind){
        case LOG_SHIFT:
            let guardId = parseInt(logEntry.unparsed.substr(logEntry.unparsed.indexOf("#") + 1, 4).trimRight());
            timeTable.push({ guardId : guardId, timeLog : Array(60).fill("."), entry : logEntry})
            break;
        case LOG_SLEEP:
            timeTable[timeTable.length-1].timeLog[logEntry.minute] = "#";
            break;
        case LOG_WOKE:
                let targetShiftIndex = timeTable.length-1;
                let movingIndex = logEntry.minute-1;
                while(movingIndex > 0 && timeTable[targetShiftIndex].timeLog[movingIndex] != "#"){
                    timeTable[targetShiftIndex].timeLog[movingIndex] = "#";
                    movingIndex--;
                }
            break;
    }
}

let guardTargetId = -1;
let allTimeSleepRecord = 0;

for (let i = 0; i < timeTable.length; i++) {
    const uncategorizedShift = timeTable[i];
    const guardShifts = timeTable.filter(s => s.guardId == uncategorizedShift.guardId);

    let curGuardSleepRecord = 0;
    for (let k = 0; k < guardShifts.length; k++) {
        const guardShift = guardShifts[k];
        for (let j = 0; j < guardShift.timeLog.length; j++) {
            const token = guardShift.timeLog[j];
            if(token == "#"){
                curGuardSleepRecord++;
            }
        }   
    }
  
    if(curGuardSleepRecord > allTimeSleepRecord){
        allTimeSleepRecord = curGuardSleepRecord;
        guardTargetId = uncategorizedShift.guardId;
    }
}

let sleepMinuteCounts = Array(60).fill(0);

const guardShifts = timeTable.filter(s => s.guardId == guardTargetId);


for (let k = 0; k < guardShifts.length; k++) {
    const targetShift = guardShifts[k];
    for (let h = 0; h < targetShift.timeLog.length; h++) {
        const token = targetShift.timeLog[h];
        if(token == "#"){
            sleepMinuteCounts[h]++;
        }
    }
}

let sleepyMinute = 0;
let minuteWithMostSleep = 0;
for (let i = 0; i < sleepMinuteCounts.length; i++) {
    if(sleepMinuteCounts[i] > minuteWithMostSleep){
        sleepyMinute = i;
        minuteWithMostSleep = sleepMinuteCounts[i];
    }
    
}
console.log(sleepyMinute*guardTargetId);
