// The current database to use.
use("rhythmroth");

db.getCollection("songs").insertMany(
    [
        {
            _id: 1001,
            name: "Red, White and Black Butterfly",
            artist: "Demetori",
            src: "https://dl.dropbox.com/scl/fi/nqwzpnzsr23nezq8dlaif/02-Red-White-and-Black-Butterfly.flac?rlkey=3cnfvr2cznt539yrcc3r0nhro&st=4237azz1",
            duration: "6:35",
            coverSrc:
                "https://dl.dropbox.com/scl/fi/itm6jdk8p6hb7aigyr5lu/Demetori-The-Truth-of-the-Cessation-of-Dukkha.jpg?rlkey=fy8ug953nmi7wc8c438itpokv&st=jh1yqtip",
        },
        {
            _id: 1002,
            name: "Memory of a Free Festival",
            artist: "Demetori",
            src: "https://dl.dropbox.com/scl/fi/y0wq7l9bgvtu0a9b0twi4/03-Memory-of-a-Free-Festival.flac?rlkey=m7cj0563re2or3kt9hvf154lm&st=5ro89v8m",
            duration: "4:31",
            coverSrc:
                "https://dl.dropbox.com/scl/fi/itm6jdk8p6hb7aigyr5lu/Demetori-The-Truth-of-the-Cessation-of-Dukkha.jpg?rlkey=fy8ug953nmi7wc8c438itpokv&st=jh1yqtip",
        },
        {
            _id: 1003,
            name: "Orgy of the Dead",
            artist: "Demetori",
            src: "https://dl.dropbox.com/scl/fi/yjz3cglnl3brf2uhh8ms6/04-Orgy-of-the-Dead.flac?rlkey=pahcgb9rrsud51eofow9iocgd&st=34544qn1",
            duration: "5:07",
            coverSrc:
                "https://dl.dropbox.com/scl/fi/itm6jdk8p6hb7aigyr5lu/Demetori-The-Truth-of-the-Cessation-of-Dukkha.jpg?rlkey=fy8ug953nmi7wc8c438itpokv&st=jh1yqtip",
        },
        {
            _id: 1004,
            name: "Point Of Know Return",
            artist: "Demetori",
            src: "https://dl.dropbox.com/scl/fi/qskf0r9pavgzbrmavniai/05-Point-Of-Know-Return.flac?rlkey=pmri0sqs1miwalqrsexcmevej&st=60i20pzl",
            duration: "7:40",
            coverSrc:
                "https://dl.dropbox.com/scl/fi/itm6jdk8p6hb7aigyr5lu/Demetori-The-Truth-of-the-Cessation-of-Dukkha.jpg?rlkey=fy8ug953nmi7wc8c438itpokv&st=jh1yqtip",
        },
        {
            _id: 1005,
            name: "Re-The Harm of Coming into Existence",
            artist: "Demetori",
            src: "https://dl.dropbox.com/scl/fi/ikeee5kqihuglsoxcde80/06-Re-The-Harm-of-Coming-into-Existence.flac?rlkey=mmsso4ok4cp6h3g95zlh9s4yv&st=h3e3u0l7",
            duration: "6:45",
            coverSrc:
                "https://dl.dropbox.com/scl/fi/itm6jdk8p6hb7aigyr5lu/Demetori-The-Truth-of-the-Cessation-of-Dukkha.jpg?rlkey=fy8ug953nmi7wc8c438itpokv&st=jh1yqtip",
        },
        {
            _id: 1006,
            name: "Heart of the Sunrise",
            artist: "Demetori",
            src: "https://dl.dropbox.com/scl/fi/vqvwjeosx618xru7c7h8y/07-Heart-of-the-Sunrise.flac?rlkey=1ekwmdct3e41qvoum726716is&st=e8s5cxwi",
            duration: "2:19",
            coverSrc:
                "https://dl.dropbox.com/scl/fi/itm6jdk8p6hb7aigyr5lu/Demetori-The-Truth-of-the-Cessation-of-Dukkha.jpg?rlkey=fy8ug953nmi7wc8c438itpokv&st=jh1yqtip",
        },
        {
            _id: 1007,
            name: "It's Better To Burn Out Than To Fade Away",
            artist: "Demetori",
            src: "https://dl.dropbox.com/scl/fi/j6sb4iqqn4vqoydef68hg/08-Peaceful-Romancer-It-s-Better-To-Burn-Out-Than-To-Fade-Away.flac?rlkey=5fxx3x75mv25imk0ruyva8m2s&st=x6dlxqfq",
            duration: "9:16",
            coverSrc:
                "https://dl.dropbox.com/scl/fi/itm6jdk8p6hb7aigyr5lu/Demetori-The-Truth-of-the-Cessation-of-Dukkha.jpg?rlkey=fy8ug953nmi7wc8c438itpokv&st=jh1yqtip",
        },
        {
            _id: 1008,
            name: "Innocent Treasures",
            artist: "Demetori",
            src: "https://dl.dropbox.com/scl/fi/6ccdmn6wd5x3fywqfz8n6/01.-Innocent-Treasures.mp3?rlkey=gji4ei2bm3j7slky808crm8f3&st=0l524l90",
            duration: "5:22",
            coverSrc:
                "https://dl.dropbox.com/scl/fi/x7t7tokebdp2oi40czwnp/Offering-to-The-Sukhavati.jpg?rlkey=aeuxgbjis6u3m563nqo1zhiwq&st=2u37ybvs",
        },
        {
            _id: 1009,
            name: "Deep P Sky",
            artist: "Demetori",
            src: "https://dl.dropbox.com/scl/fi/t6fidydo1bb8wecdit6uc/04.-Deep-P-Sky.mp3?rlkey=xvicvhywrh0pjechhn9hw0pds&st=g98js37b",
            duration: "4:58",
            coverSrc:
                "https://dl.dropbox.com/scl/fi/x7t7tokebdp2oi40czwnp/Offering-to-The-Sukhavati.jpg?rlkey=aeuxgbjis6u3m563nqo1zhiwq&st=2u37ybvs",
        },
        {
            _id: 1010,
            name: "Casket of Star",
            artist: "Demetori",
            src: "https://dl.dropbox.com/scl/fi/b35suhc6g8xrjxt4w7dwr/06.-f-Casket-of-Star.mp3?rlkey=3k75kuwsxkyhb7dr3rxrkmcqh&st=0vtr2m10",
            duration: "4:07",
            coverSrc:
                "https://dl.dropbox.com/scl/fi/ekffk5b2ke60f3em5d3kg/le-Grimoire-De-reve.jpg?rlkey=0ibsoz65ked5rqoxp0bdivpqd&st=yabsoiq9",
        },
        {
            _id: 1011,
            name: "Spirited Away",
            artist: "A-One",
            src: "https://dl.dropbox.com/scl/fi/9valmig4pub72gw2zp7n3/Eurobeat-Spirited-Away-A-One.mp3?rlkey=pdmx4ozlp585vuizvytk0zre8&st=1uqb5xcv",
            duration: "5:30",
            coverSrc:
                "https://dl.dropbox.com/scl/fi/esnq0q3crk96v39481btu/2.png?rlkey=3eur5sb2a8fbx9j2203rmhxjm&st=qku2c7s6",
        },
        {
            _id: 1012,
            name: "Morning Dew",
            artist: "Arknighto",
            src: "https://dl.dropbox.com/scl/fi/g1mu8iqknilejzraqb1u3/Arknights-EP-Morning-Dew.mp3?rlkey=ljjzr255omvp5iq5u9l69gg8u&st=vfxhdpj6",
            duration: "3:27",
            coverSrc:
                "https://dl.dropbox.com/scl/fi/vyq6hm45i2vsktycmsqqs/morning_dew.png?rlkey=vjdwn8sdk5wcwonkqvx3rs27k&st=s1ps7eow",
        },
        {
            _id: 1013,
            name: "Before Summer",
            artist: "Arknighto",
            src: "https://dl.dropbox.com/scl/fi/5lqwshiu8vb8of3070h8r/Arknights-EP-Before-Summer.mp3?rlkey=if0xfrztzzzp5ya09iekq5jre&st=3rxco0ks",
            duration: "3:56",
            coverSrc:
                "https://dl.dropbox.com/scl/fi/9zpanw98swg2qa7o1380x/before_summer.jpg?rlkey=otxot4z0x8hzg8kquvwqa86hj&st=ajgqjvgi",
        },
        {
            _id: 1014,
            name: "マンネリウィークエンド",
            artist: "FAKE TYPE",
            src: "https://dl.dropbox.com/scl/fi/xplsw014iq5t283ebxewe/FAKE-TYPE.-feat.-MV.mp3?rlkey=ojuggkqxbb9sspeph6cfnr8t1&st=jo600ouk",
            duration: "3:14",
            coverSrc:
                "https://dl.dropbox.com/scl/fi/n2tbi3ouwly61o6jh3ctk/.jpg?rlkey=ga8y2veol48lcyev78hsjc2s1&st=q7hrr632",
        },
        {
            _id: 1015,
            name: "VORTEX",
            artist: "Jaws",
            src: "https://dl.dropbox.com/scl/fi/w1cddohligqgrggruxbbv/VORTEX-jaws.mp3?rlkey=exgpjgq6mjbxqm7yowi4twj3i&st=1hxl7o48",
            duration: "4:09",
            coverSrc:
                "https://dl.dropbox.com/scl/fi/wyqs0xog6evtcdj9amre0/VORTEX.png?rlkey=x5llsxgncyx8sn80k5op2ohwu&st=ojwgd95i",
        },
    ],
    { ordered: false }
);
