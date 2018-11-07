// This is actual Onion content that can be used to test the front end, or if a news API will work well, or anything else
// Note: to transform the date string into a date object, just do something like this:
//     let publishedDate = new Date (fakeDataArr[i].timePublished)
// Then, you can get whatever data out you want in whatever format, here is a sample formatting function in case it's useful:

let makeFriendlyDate = (dateObj) => {
   let dt = dateObj; // only because I'm a lazy typer
   let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   let formatTime = (hours, minutes) => {
      let min = (parseInt(minutes) < 10) ? '0' + minutes : minutes;
      let hr = (hours < 12) ? (hours === 0 ? 12 : hours) : (hours % 12);
      return (hr + ':' + min) + ((hours < 12) ? ' AM':' PM');
    }
    let friendlyDate = months[dt.getMonth()]  + " " + dt.getDate() + ', ' + dt.getFullYear() + '  '
                       + formatTime(dt.getHours(), dt.getMinutes());
    return friendlyDate;
};

// Sample use:
// let friendlyDate = makeFriendlyDate((new Date(fakeDataArr[i].timePublished)));


// AND HERE is the fake data:

var fakeDataArr = [{
      sourceID: 'onion1830079021',
      title: 'Coleman Unveils New Slowly Leaking Air Mattress For House Guests Who Won’t Take A Hint',
      url: 'https://www.theonion.com/coleman-unveils-new-slowly-leaking-air-mattress-for-hou-1830079021',
      category: 'News in Brief',
      timePublished: '2018-10-29T19:26:00.000Z',
      summary: 'WICHITA, KS—Touting their new product as a necessary innovation in short-stay accommodations, camping and portable sleeping gear manufacturer Coleman unveiled the SinkRest this Monday, an air mattress featuring built-in gradual leaks for house guests who refuse to take a hint. “We’ve specifically designed this…',
      content: ['WICHITA, KS—Touting their new product as a necessary innovation in short-stay accommodations, camping and portable sleeping gear manufacturer Coleman unveiled the SinkRest this Monday, an air mattress featuring built-in gradual leaks for house guests who refuse to take a hint. “We’ve specifically designed this mattress to guarantee that after two or three uncomfortable nights, any guest overstaying their welcome will leave with mild to moderate back pain,” said Coleman spokesperson Jana Penn, adding that the new mattress comes with a custom-dilating pinprick feature allowing customers to tailor the degree of discomfort to the specific irritant level of any given guest. “Adjustable pneumatic outflow levels allow guests to either sink at an excruciatingly gradual rate through the mattress, waking up as an achy hot dog in a soggy bun, or to feel their joints crack against the floor after only a few tosses and turns. With the SinkRest family of products, overtaxed hosts can be confident that after a few nights of tossing and turning, clueless guests will have no choice but to realize they’d be better off at a motel.” To commemorate the excruciating portable bed’s introduction, those buying any size SinkRest mattress in the next 60 days will receive a thin, scratchy blanket free of charge.'],
      src: 'https://i.kinja-img.com/gawker-media/image/upload/s--N-9O4_rP--/c_fill,f_auto,fl_progressive,g_center,h_180,q_80,w_320/f8xryupl6tnnf31djyk2.jpg',
      source: 'The Onion',
      keywords: ['coleman', 'gradual', 'pinprick', 'overtaxed', 'house guests', 'beds', 'short-stay', 'achy', 'overstaying', 'excruciatingly', 'air mattress', 'scratchy'],
      real: 'temporary real news hack'
   },
   {
      sourceID: 'onion1830077614',
      title: 'New Study Shows Majority Of Late Afternoon Sleepiness At Work Caused By Undetected Carbon Monoxide Leak',
      url: 'https://www.theonion.com/new-study-shows-majority-of-late-afternoon-sleepiness-a-1830077614',
      category: 'News in Brief',
      timePublished: '2018-10-29T18:41:00.000Z',
      summary: 'WASHINGTON—Investigating a sudden uptick in nationwide on-the-job somnolence, the United States Occupational Safety and Health Administration released a study Monday showing that the majority of late afternoon sleepiness in the American workplace is in fact caused by an undetected carbon monoxide leak. “Our…',
      content: ['WASHINGTON—Investigating a sudden uptick in nationwide on-the-job somnolence, the United States Occupational Safety and Health Administration released a study Monday showing that the majority of late afternoon sleepiness in the American workplace is in fact caused by an undetected carbon monoxide leak. “Our investigations found that a lack of focus, weariness, or general disinclination to perform at a job after normal lunch hours is most likely a sign that an employee is breathing in colorless, odorless, noxious fumes,” said lead researcher Mario Garrison, noting that over half the people who are feeling any kind of exhaustion or sluggishness at their place of employment between the hours of noon and 3 p.m. are being slowly poisoned at their desks or workstations. “Employees who become sleepy and close their eyes during the afternoon are in danger of never opening them again. The buildup of gas can be slow, as carbon monoxide is slightly lighter than air, so it may go unnoticed the entire morning. But make no mistake: From your first workplace yawn, you could be dead within an hour.” Garrison suggested that anyone who was feeling even the slightest bit tired in the afternoon hours at their place of employment should take the rest of the day off.'],
      src: 'https://i.kinja-img.com/gawker-media/image/upload/s--lGaNTnY1--/c_fill,f_auto,fl_progressive,g_center,h_180,q_80,w_320/y1ldfhqraqlwkigylr8t.jpg',
      source: 'The Onion',
      keywords: ['carbon monoxide', 'garrison', 'noxious fumes', 'disinclination', 'dead within', 'gas can', 'sluggishness', 'somnolence', 'on-the-job', 'odorless', 'health administration', 'sleepiness'],
      real: 'temporary real news hack'
   },
   {
      sourceID: 'onion1830077401',
      title: 'Trump Slams Worldwide Jewish Conspiracy For Not Doing More To Prevent Synagogue Shooting',
      url: 'https://politics.theonion.com/trump-slams-worldwide-jewish-conspiracy-for-not-doing-m-1830077401',
      category: 'News in Brief',
      timePublished: '2018-10-29T18:33:00.000Z',
      summary: 'WASHINGTON—In the aftermath of a shooting at a Pittsburgh synagogue that left 11 people dead, President Donald Trump reportedly slammed the worldwide Jewish conspiracy Monday for not doing more to prevent the violent attack. “I condemn in the strongest possible terms the shadowy global cabal of Jewish people who,…',
      content: ['WASHINGTON—In the aftermath of a shooting at a Pittsburgh synagogue that left 11 people dead, President Donald Trump reportedly slammed the worldwide Jewish conspiracy Monday for not doing more to prevent the violent attack. “I condemn in the strongest possible terms the shadowy global cabal of Jewish people who, despite the fact that they control everything on Earth, weren’t even able to stop a single shooter,” said Trump in a press conference, adding that he didn’t understand why the worldwide Jewish conspiracy didn’t simply hypnotize the killer through the television or create a massive storm that would have stopped him from leaving his house. “This entire tragedy could have been avoided if the Jews had simply manipulated the global economy and the banks to ensure that the shooter didn’t have enough money to afford a gun or ammunition. It is an absolute shame that the worldwide Jewish plot failed to telepathically communicate the imminent danger to the people in the building, or use their minds to erect an invisible, impenetrable barrier around the entire synagogue.” Trump ended his speech by calling for unity in the worldwide Jewish conspiracy to prevent future anti-Semitic hate crimes with their mystical powers.'],
      src: 'https://i.kinja-img.com/gawker-media/image/upload/s--V_y5LyFt--/c_fill,f_auto,fl_progressive,g_center,h_180,q_80,w_320/jyak4whjxztgi92axma8.jpg',
      source: 'The Onion',
      keywords: ['jewish conspiracy', 'synagogue', 'mystical powers', 'hypnotize', 'telepathically', 'imminent danger', 'impenetrable', 'hate crimes', 'shadowy', 'cabal', 'erect', 'the global economy'],
      real: 'temporary real news hack'
   },
   {
      sourceID: 'onion1830077292',
      title: 'Man Doesn’t Get Why People Waste Money On Therapist When They Could Just Emotionally Crush Girlfriend',
      url: 'https://local.theonion.com/man-doesn-t-get-why-people-waste-money-on-therapist-whe-1830077292',
      category: 'News in Brief',
      timePublished: '2018-10-29T18:30:00.000Z',
      summary: 'BOLINGBROOK, IL—Explaining that seeking professional psychological help was a big scam when there were better, cheaper alternatives, local man Justin Treanor told reporters Monday that he doesn’t understand why people waste money on a therapist when they could just emotionally crush their girlfriend. “A therapist can…',
      content: ['BOLINGBROOK, IL—Explaining that seeking professional psychological help was a big scam when there were better, cheaper alternatives, local man Justin Treanor told reporters Monday that he doesn’t understand why people waste money on a therapist when they could just emotionally crush their girlfriend. “A therapist can cost hundreds of dollars for just one session, but taking your problems out on the one who loves you is free,” said Treanor, adding that his romantic partner was always there when he needed to work things out by destroying her spirit, while scheduling an appointment with a therapist was time-consuming and could take weeks. “Why wait a month and possibly have to take time off of work to see a counselor when my girl is already right there to belittle and blame at home? Besides, if I’m going to confront my demons, I’d rather have someone I know and trust to lash out at.” Treanor added that he knew it was the right decision when he experienced a recent breakthrough that resulted in his girlfriend crying herself to sleep.'],
      src: 'https://i.kinja-img.com/gawker-media/image/upload/s--oXmqeOP8--/c_fill,f_auto,fl_progressive,g_center,h_180,q_80,w_320/hut8o9gtjgjhiylnsc41.jpg',
      source: 'The Onion',
      keywords: ['treanor', 'therapist', 'bolingbrook', 'cheaper alternatives', 'who loves you', 'why wait', 'lash out', 'belittle', 'always there', 'time-consuming', 'on the one', 'counselor'],
      real: 'temporary real news hack'
   },
   {
      sourceID: 'onion1830074803',
      title: 'MTA Unveils $28 Billion Plan To Renovate Subway Masturbators',
      url: 'https://www.theonion.com/mta-unveils-28-billion-plan-to-renovate-subway-masturb-1830074803',
      category: 'News in Brief',
      timePublished: '2018-10-29T17:10:00.000Z',
      summary: 'NEW YORK—In what many are calling a long-awaited overhaul to New York’s underground network of flashers, perverts, and yankers, the Metropolitan Transportation Authority unveiled a $28 billion plan Monday to renovate their citywide fleet of subway masturbators. “This incredible initiative will bring new life to the…',
      content: ['NEW YORK—In what many are calling a long-awaited overhaul to New York’s underground network of flashers, perverts, and yankers, the Metropolitan Transportation Authority unveiled a $28 billion plan Monday to renovate their citywide fleet of subway masturbators. “This incredible initiative will bring new life to the 6,400 aging, outdated sexual deviants that currently pleasure themselves alongside New York City’s 5.7 million commuters per day,” said MTA CEO John Lhota, adding that by the end of 2019, residents can expect the city’s updated perverts to masturbate more frequently, more reliably, and in 30 percent more locations. “Sadly, the city has allowed many of these subway masturbators to become old and outdated, and their nude, damaged bodies—many of which date back to the 1960s—are a frequent eyesore. While there will inevitably be delays during the upcoming renovations, the result will be the most clean, efficient, and consistent sex criminals New York has ever seen.” Lhota excitedly added that the plan was expected to make the subway riding experience 75 percent less safe for women.'],
      src: 'https://i.kinja-img.com/gawker-media/image/upload/s--m22a6fIF--/c_fill,f_auto,fl_progressive,g_center,h_180,q_80,w_320/woatz45f5arjvlrnzo1q.jpg',
      source: 'The Onion',
      keywords: ['lhota', 'masturbators', 'perverts', 'subway', 'outdated', 'yankers', 'sex criminals', '6,400', 'sexual deviants', 'underground network', 'flashers', 'transportation authority'],
      real: 'temporary real news hack'
   },
   {
      sourceID: 'onion1830074653',
      title: '‘Fox & Friends’ Denounces Bombing Suspect As Overenthusiastic Fan Whose Heart Basically In Right Place',
      url: 'https://www.theonion.com/fox-friends-denounces-bombing-suspect-as-overenthus-1830074653',
      category: 'News in Brief',
      timePublished: '2018-10-29T17:04:00.000Z',
      summary: 'NEW YORK—Taking a moment from their morning broadcast to castigate Cesar Soyec, the man accused with mailing out explosives to numerous prominent Democrats and Trump critics, Fox & Friends hosts denounced the bombing suspect Monday as an overenthusiastic fan whose heart was basically in the right place. “This…',
      content: ['NEW YORK—Taking a moment from their morning broadcast to castigate Cesar Soyec, the man accused with mailing out explosives to numerous prominent Democrats and Trump critics, Fox & Friends hosts denounced the bombing suspect Monday as an overenthusiastic fan whose heart was basically in the right place. “This senseless act of attempted violence is a disturbing example of a super-fan getting a little too worked up and going a bit overboard,” said co-host Brian Kilmeade, describing Soyec as a “decent-seeming guy” whose “understandable exuberance appears to have gotten the better of him.” “We condemn this man’s heinous actions in the strongest possible terms, while applauding his can-do attitude, innovative spirit, and commitment to getting involved in the country’s political process. Of course, wide-scale assassination attempts are never acceptable, and it’s a real shame that a pretty awesome dude wasn’t able to pump the brakes slightly more.” Kilmeade urged viewers to take Soyec’s zealousness as an inspiration, but warned them to “dial it down a smidge.”'],
      src: 'https://i.kinja-img.com/gawker-media/image/upload/s--kSkmJzDE--/c_fill,f_auto,fl_progressive,g_center,h_180,q_80,w_320/vbpz5h91t2d3uqmmex23.jpg',
      source: 'The Onion',
      keywords: ['co-host brian kilmeade', 'zealousness', 'kilmeade', 'overenthusiastic', 'super-fan', 'assassination attempts', 'castigate', 'wide-scale', 'smidge', 'can-do attitude', 'the man accused', 'exuberance'],
      real: 'temporary real news hack'
   },
   {
      sourceID: 'onion1830074185',
      title: '‘It’s Like You’re Hearing Me But You’re Not Listening To Me,’ Says Man To Representative On Oscar Mayer Customer Service Hotline',
      url: 'https://local.theonion.com/it-s-like-you-re-hearing-me-but-you-re-not-listening-t-1830074185',
      category: 'News in Brief',
      timePublished: '2018-10-29T16:52:00.000Z',
      summary: 'BUFFALO GROVE, IL—Emphasizing that communication was a “two-way street,” local man Thomas Ross expressed concern Monday that he was being heard, but not listened to by a representative taking his call on the Oscar Mayer customer service hotline. “I just keep talking and talking, and it’s like you’re not even listening…',
      content: ['BUFFALO GROVE, IL—Emphasizing that communication was a “two-way street,” local man Thomas Ross expressed concern Monday that he was being heard, but not listened to by a representative taking his call on the Oscar Mayer customer service hotline. “I just keep talking and talking, and it’s like you’re not even listening at all,” said Ross, adding that it hurt him deeply to have his vulnerability met with such callous indifference by a customer service representative who he had assumed cared about him. “What about what I want, Reggie? Is it too much to ask for a three-cheese hotdog? All you do is offer platitudes and pretend like we haven’t had this conversation a dozen times before. You should at least have the balls to give it to me straight, Reggie! I think you owe me that much.” At press time, Ross accused the representative of exploiting a power imbalance in their relationship by bringing his manager into the fold.'],
      src: 'https://i.kinja-img.com/gawker-media/image/upload/s--KPo6EtGT--/c_fill,f_auto,fl_progressive,g_center,h_180,q_80,w_320/nmxoals6x7v4erdbx03c.jpg',
      source: 'The Onion',
      keywords: ['ross', 'reggie', 'three-cheese', 'callous indifference', 'buffalo grove', 'two-way street', 'hotdog', 'platitudes', 'customer service representative', 'the oscar', 'keep talking', 'his call'],
      real: 'temporary real news hack'
   },
   {
      sourceID: 'onion1830074061',
      title: 'Queen Elizabeth Hides Out In Bushes To Catch Whoever Keeps Stealing Packages From Buckingham Palace Porch',
      url: 'https://www.theonion.com/queen-elizabeth-hides-out-in-bushes-to-catch-whoever-ke-1830074061',
      category: 'News in Brief',
      timePublished: '2018-10-29T16:47:00.000Z',
      summary: 'LONDON—Her royal eye trained on the building entrance in careful anticipation of potential parcel thieves, Queen Elizabeth II reportedly concealed herself in the shrubbery Monday in order to apprehend whoever was stealing the packages from the Buckingham Palace porch. “Just last week, I ordered the loveliest FitBit…',
      content: ['LONDON—Her royal eye trained on the building entrance in careful anticipation of potential parcel thieves, Queen Elizabeth II reportedly concealed herself in the shrubbery Monday in order to apprehend whoever was stealing the packages from the Buckingham Palace porch. “Just last week, I ordered the loveliest FitBit Charge 3, received a notification that it had been delivered, and, upon arriving home, found that someone had stolen it. I have re-ordered the item, and if an attempt is made to steal this one, I intend to catch the fucker,” said the 92-year-old monarch, who primly grumbled vows of revenge while aiming a double-barreled fowling piece at the front steps of the royal residence. “Naturally, I placed a sign on the portico in case one of my neighbors took it by accident, but of course no one has yet returned it. And FitBits are rather dear; that’s 120 pounds sterling I shan’t see again. But I’m going to make damn sure this one doesn’t get taken. Honestly, I simply can’t believe how much this neighborhood has gone downhill.” At press time, the queen had fired a volley of birdshot just above the head of a shadowy figure that turned out to be Prince Philip.'],
      src: 'https://i.kinja-img.com/gawker-media/image/upload/s---N-ljkqY--/c_fill,f_auto,fl_progressive,g_center,h_180,q_80,w_320/psg9y6orptisgvinbqrg.jpg',
      source: 'The Onion',
      keywords: ['fowling', 'birdshot', '92-year-old monarch', 're-ordered', 'the portico', 'the buckingham palace', 'primly', 'shadowy figure', 'double-barreled', 'pounds sterling', 'steal this', 'fitbits'],
      real: 'temporary real news hack'
   },
   {
      sourceID: 'onion1830071838',
      title: 'Report: Average American Spends 25% Of Life Waiting In Line At Cell Phone Store',
      url: 'https://www.theonion.com/report-average-american-spends-25-of-life-waiting-in-1830071838',
      category: 'News in Brief',
      timePublished: '2018-10-29T15:35:00.000Z',
      summary: 'STANFORD, CA—Researchers from Stanford University published the results of an alarming report Tuesday that confirmed the average American spends roughly 25 percent of their life waiting in line at a cell phone store. “Our analysis found that most people spend about 20 to 25 years of their lives waiting to be helped by…',
      content: ['STANFORD, CA—Researchers from Stanford University published the results of an alarming report Tuesday that confirmed the average American spends roughly 25 percent of their life waiting in line at a cell phone store. “Our analysis found that most people spend about 20 to 25 years of their lives waiting to be helped by the next free employee behind a cell phone store counter, often attempting to amuse themselves by looking across the room at the selection of cell phone cases or half-heartedly watching whatever is playing on the store’s television,” said lead researcher Kim Flores, explaining that by including the amount of time Americans spent seated in a chair in the store’s waiting room, the number would increase to over 40 percent of one’s life span. “We certainly didn’t think it was possible, but the numbers don’t lie. Countless people have lost many years of their lives, missing important events such as loved ones’ birthdays, weddings, and funerals to instead stand in line behind five to six other customers. It’s unfortunate, but true.” Flores also confirmed that, at the time of the report, over 400 Americans had died while standing in line.'],
      source: 'The Onion',
      src: 'https://i.kinja-img.com/gawker-media/image/upload/s--iqqfV5n---/c_fill,f_auto,fl_progressive,g_center,h_180,q_80,w_320/h4yzl4inqfa7bwcz9baj.jpg',
      keywords: ['cell phone', 'stores', 'flores', 'half-heartedly', 'stand in line', 'standing in line', 'waiting room', 'amuse', 'waiting in line', 'average american', 'don\'t lie', 'life span'],
      real: 'temporary real news hack'
   },
   {
      sourceID: 'onion1830037425',
      title: 'Sunday School Teacher Can Already Tell Which Ones Going To Hell',
      url: 'https://local.theonion.com/sunday-school-teacher-can-already-tell-which-ones-going-1830037425',
      category: 'News in Brief',
      timePublished: '2018-10-28T15:00:00.000Z',
      summary: 'LANGHORNE, PA—Saying that she could sense Satan within them the moment they walked through the door, Sunday school teacher Elizabeth Reath told reporters this weekend that she could already tell which of her students at First Baptist Church of Langhorne were going to Hell. “At this point in my career, I can tell just…',
      content: ['LANGHORNE, PA—Saying that she could sense Satan within them the moment they walked through the door, Sunday school teacher Elizabeth Reath told reporters this weekend that she could already tell which of her students at First Baptist Church of Langhorne were going to Hell. “At this point in my career, I can tell just by looking at them which ones will be saved and which ones will be damned to burn in fire and brimstone for all eternity,” said Reath, emphasizing that within minutes of getting to know each of her 20 students, she had already isolated the 8-year-olds who had been marked by the Devil and had “placed her bets” on the ones that seemed destined to be banished to the Inferno later in life. “By the time they get to me, it’s way past the point where I can just pray for them and save them from their final judgment day. I mean, half the kids in this class have had at least one parent who will end up in Hell. At this point, they may as well just surrender themselves to Satan.” At press time, a visibly disappointed Reath had reprimanded one of her star pupils for interrupting class after being possessed by a demon.'],
      source: 'The Onion',
      src: 'https://local.theonion.com/sunday-school-teacher-can-already-tell-which-ones-going-1830037425',
      keywords: ['reath', 'langhorne', 'satan', 'just surrender', '8-year-olds', 'sunday school teacher', 'final judgment', 'brimstone', 'get to me', 'the inferno', 'first baptist church', 'going to hell'],
      real: 'temporary real news hack'

   },
];