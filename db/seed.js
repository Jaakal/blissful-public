const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')
const db = require('./index')

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// @route   GET api/seed
// @desc    Get the input for the BTCPay Server
// @access  Public
router.get('/btcpay', async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT sb.id, name, city, address, duration, price FROM "Studio" s INNER JOIN "Studio.BodyTreatment" sb ON s.id = sb.studio_id INNER JOIN "BodyTreatment" bt ON sb.body_treatment_id = bt.id ORDER BY sb.id, city ASC, address ASC, price ASC`);
    
    let BTCPayServerString = ''

    for (let i = 0; i < rows.length; i += 1) {
      BTCPayServerString += `${rows[i].id}:\n  price: ${rows[i].price}\n  title: ${rows[i].name}\n  description: ${rows[i].city}, ${rows[i].address}, ${rows[i].duration}min\n\n`
    }

    res.send(BTCPayServerString)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error!')
  }
})

// @route   GET api/seed
// @desc    Reset and seed the database
// @access  Public
router.get('/', async (req, res) => {
  try {
    await db.query(`DROP TABLE IF EXISTS "User"`)
    await db.query(
      `CREATE TABLE "User" (
      "id" SERIAL PRIMARY KEY,
      "first_name" VARCHAR(30) NOT NULL,
      "last_name" VARCHAR(50) NOT NULL,
      "email" VARCHAR(100) NOT NULL,
      "password" VARCHAR NOT NULL,
      "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`
      )

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('123456', salt)
      
    await db.query(`INSERT INTO "User" (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)`,
      ['Jaak', 'Kivinukk', 'jaak.kivinukk@gmail.com', hashedPassword])

    await db.query(`INSERT INTO "User" (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)`,
      ['John', 'Doe', 'john.doe@gmail.com', hashedPassword])
    
    await db.query(`INSERT INTO "User" (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)`,
      ['Jane', 'Doe', 'jane.doe@gmail.com', hashedPassword])
    
    await db.query(`INSERT INTO "User" (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)`,
      ['Brad', 'Doe', 'brad.doe@gmail.com', hashedPassword])
    
    await db.query(`INSERT INTO "User" (first_name, last_name, email, password) VALUES($1, $2, $3, $4)`,
      ['Greg', 'Doe', 'greg.doe@gmail.com', hashedPassword])
    
    await db.query(`INSERT INTO "User" (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)`,
      ['Mary', 'Doe', 'mary.doe@gmail.com', hashedPassword])
    
    await db.query(`DROP TABLE IF EXISTS "Studio.BodyTreatment"`)
    await db.query(`DROP TABLE IF EXISTS "BodyTreatment"`)
    await db.query(
      `CREATE TABLE "BodyTreatment" (
      "id" SERIAL PRIMARY KEY,
      "name" VARCHAR(200) NOT NULL,
      "image_link" VARCHAR(200) NOT NULL,
      "short_description" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`
      )

    await db.query(`INSERT INTO "BodyTreatment" (name, image_link, short_description, description) VALUES ($1, $2, $3, $4)`,
        ['Classical Massage',
        'classical-massage.jpeg',
        'Unwind with this relaxing massage that uses long, gentle strokes to improve circulation and reduce tension, while energizing the mind, body and spirit.',
        `<p>Swedish classical massage is the most common and best-known type of massage, where massage therapist manually works on Your body surfaces, directly on the skin, using often oil or cream as lubricator. Massage influences body in diverse ways, generally ameliorating blood and lymph circulation, which helps to speed up metabolism of whole organism &amp; to activate the functioning of the heart &amp; other organs. Massage helps to relieve muscle tension, increase muscle elasticity &amp; improve oxygen supply to the muscles. With the help of a massage the tiredness of muscles will pass quicker than just resting. Swedish massage promotes relaxation both in physical &amp; mental overtension states.</>
        <p>Contraindications to massage:</p>
        <ul>
        <li>serious cardio-vascular conditions</li>
        <li>cancer, tumors</li>
        <li>varicose veins (for leg massage)</li>
        <li>acute kidney insufficiency</li>
        <li>lupus, connective tissue necrosis</li>
        <li>purulent inflammation</li>
        <li>acute injuries, bleeding</li>
        <li>risk of miscarriage in pregnancy</li>
        </ul>
        <p>We suggest massage for:</p>
        <ul>
        <li>slowed blood &amp; lymph circulation</li>
        <li>blood supply disorders</li>
        <li>mildly agitated nervous system &amp; stress</li>
        <li>sleeping disorders</li>
        <li>muscle tension &amp; pain</li>
        <li>limited range of motion in joints</li>
        <li>breathing difficulties</li>
        <li>mildly heightened blood pressure</li>
        <li>lymphostasis &amp; build-up of metabolic residues</li>
        <li>slowed bowel peristalsis</li>
        <li>tension headache</li>
        <li>skin tiredness, dryness &amp; emerging wrinkles</li>
        <li>weakness of immunity system</li>
        <li>compulsory working position, bad body posture</li>
        <li>lost emotional balance</li>
        <li>intellectual exhaustion</li>
        <li>depression, mood downward swings,</li>
        <li>healthy pregnancy.</li>
        </ul>
        <p>It is suggested to drink water or green tea after the massage to help body to get rid of metabolic residues.</p>`
        ])

    await db.query(`INSERT INTO "BodyTreatment" (name, image_link, short_description, description) VALUES ($1, $2, $3, $4)`,
        ['Sports Massage',
        'sports-massage.jpeg',
        'Great for athletes who want to maximize performance and physical conditioning. Increases power, endurance and flexibility using targeted muscle strokes and stretching of tendons.',
        `<p>
            For anyone participating in regular physical activity, sports massage
            therapy every week or two may be a great addition to normal exercise
            program. Sports massage uses classical Swedish massage techniques
            together with active and passive movements, stretching, neuromuscular
            and facial release techniques. Sports massage is divided into
            pre-competition and post-competition massage therapy, the later one
            dividing also into restoring and healing massage therapy.
          </p>
          <p>
            Pre-competition massage should be quick and superficial to not to reduce
            muscle-tone; deeper and much more relaxing restoring sports massage
            should not to be taken less than 48h before planned performance time.
            Healing sports massage therapy is meant to be used after acute injuries
            and usually employs both Manual Lymphatic Drainage (MLD) and fascial
            release techniques. Just like regular exercise can keep your muscles
            strong, regular massage can help keep your immune system performing at
            its peak. The particulars of the sports massage technique are specific
            to the sport of choice, focusing on areas of the body that are overused
            and stressed from repetitive and often aggressive movements.
          </p>
          <p>
            Sports massage therapy can be used as a means to enhance pre-event
            preparation and reduce recovery time for maximum performance during
            training or after an event. Massage promotes flexibility, reduces
            fatigue, improves endurance, helps prevent injuries and prepares body
            and mind for optimal performance. One of the key benefits of sports
            massage is its ability to target connective tissue at muscles’
            attachment location that is prone to micro-traumas in case of any
            prolonged strains.
          </p>
          <p>
            Massage therapy is a beneficial treatment for maintaining and improving
            flexibility and motion. By working on muscles, connective tissues,
            tendons, ligaments and joints, regular massage can improve flexibility
            and range of motion, keeping joints more fluid and making them less
            injury prone. Muscle injuries are more common now than they were 50
            years ago. That’s not because we’re exercising harder. It’s because
            we’re more sedentary. What’s worse, as we age our joints tend to
            tighten, making range of motion and flexibility even more restricted.
            Research has found that even a 30-second massage improves hip-flexor
            range of motion.
          </p>
          <p>
            Massage is a great way to relax stressed muscles, stimulate blood flow
            and improve flexibility. So is daily stretching. One benefit of
            stretching is an improvement of blood circulation, which aids in illness
            recovery and disease prevention. Elongating muscles will also improve
            posture and joints’ range of motion. Stretching and massage are even
            more important for someone who is physically active. Loose muscles are
            less prone to strains and sprains during a workout. Incorporating
            massage and stretching into a fitness routine also will help reduce
            soreness after a workout. Studies have demonstrated a notable trend
            toward decreased muscle soreness in the athletes who received massage
            either before or after exercise. Stretching beforehand will allow
            greater freedom of movement when exercising and longer workout periods
            because it helps prevent a buildup of lactic acid. Regular post-workout
            massages can then aid in the recovery and relaxation process.
          </p>
          <p>
            Sports injury massage therapy can help reduce stiffness, restore
            movement, and provide relaxation that helps focus on healthy healing
            instead of soreness and anxiety. From a sprained ankle or twisted knee
            to muscle spasms or broken bones, massage can provide the opportunity
            for faster recovery. With the pressure of the therapist’s hands
            improving blood flow, muscles become warmer. By stretching tight tissues
            and breaking down adhesions, massage can help flush out swelling in
            joints, allowing for quicker healing. For hamstring injuries, the effect
            of stretching out tightness and loosening scar tissue can aid in
            recovery.
          </p>
          <p>
            Massage therapy can be effective for a variety of conditions, including
            arthritis, lower back pain, insomnia, headaches, anxiety, circulatory
            problems and recovery from a sports injury. Massage is great in helping
            to bring blood and nutrients to the affected area to repair the soft
            tissue. Massage also can help break up scar tissue and keep the muscles
            supple so less scar tissue develops in the first place. Massage is also
            used to aid in pain management as the injury is nursed back to full
            strength. Burn patients studied who received three months of massage
            therapy during skin rehabilitation experienced less itching and less
            depression, along with improved skin healing. By increasing circulation
            while relaxing the muscles, massage can help the body pump more oxygen
            and nutrients into tissues and vital organs. This allows the surgical
            rehabilitating areas to become more flexible and heal at an accelerated
            rate. Committing to a continual massage program can accelerate the
            recovery process after suffering injuries.
          </p>
          <p>
            The body can produce an unhealthy buildup of hormones when we’re stuck
            in traffic or meeting a work deadline. Pent-up levels of the „stress
            hormone“ cortisol can lead to sleeplessness, headaches and even
            digestive problems. Massage has been shown to decrease cortisol in the
            body. This allows the body to enter a relaxing rest-and-recovery mode an
            effect that lingers long after the massage is over. In fact, massage
            triggers a host of brain chemistry responses that can result in lasting
            feelings of relaxation, lowered stress and improved mood. Research has
            shown that massage can lower heart rate and blood pressure, relax
            muscles and increase the production of endorphins, body’s natural „feel
            good“ chemical. Serotonin and dopamine are also released through
            massage, and the result is a feeling of calm relaxation that makes
            chronic or habitual as well as acute or short-term stress much easier to
            overcome. In fact, stress relief is one of the first benefits that come
            to mind when thinking of massage therapy. It’s also a key component for
            anyone trying to achieve a healthier lifestyle. Clinical studies show
            that even a single 1 ½-hour session can significantly lower your heart
            rate, cortisol levels and insulin levels –all of which explain why
            massage therapy and stress relief go hand-in-hand. In addition to stress
            relief, ongoing massage therapy can reduce pain, increase energy levels
            and improve overall physical and mental performance.
          </p>
          <p>
            One of the telltale signs of anxiety and stress can be constricted
            breathing. When the body starts to take shallow short breaths instead of
            breathing at a natural pace, it is near impossible for one to reach a
            relaxed state. Part of the problem is that the muscles around the rib
            cage and abdomen may have tightened, constricting air. Massage plays an
            important role in training the body how to relax and help improve
            breathing. Respiratory issues, such as allergies, sinus problems, asthma
            and bronchitis, are one group of conditions that can benefit from
            massage therapy. In fact, the positive impact massage can have on
            respiratory function has been shown through research. Many muscles in
            the front and back of the upper body are accessory respiratory muscles.
            When any of these muscles are chronically tight and shortened, they can
            restrict normal breathing and disrupt breathing patterns. Massage
            techniques to lengthen and relax these muscles improve breathing
            capacity and function. Massage therapy can not only improve breathing,
            but also posture. This can lead to an opening of the chest area, as well
            as the structural alignment and rib cage expansion needed for optimal
            lung function. Plus, when the parasympathetic nervous system responds to
            massage the breathing rate slows and becomes deep and regular.
          </p>
          <p>
            Study has found that in adults with migraine headaches, massage therapy
            decreased the occurrence of headaches, sleep disturbances and distress
            symptoms. It also increased serotonin levels, believed to play an
            important role in the regulation of mood, sleep and appetite. Massage
            therapy recipients exhibited fewer migraines and better sleep quality
            during the weeks they received massage, and the three weeks following,
            than did participants that did not receive massage therapy. Migraine
            disorder can be debilitating and typically results from high stress
            levels and/or lack of sleep.
          </p>
          <p>
            Massage has two roles when it comes to treating migraines and tension
            related headaches:
          </p>
          <ul>
            <li>
              In a proactive role, massage treatments are performed on a regular
              basis to help the body maintain an optimal level of relaxation and
              stress-relief. This approach reduces the chances of migraine attacks
              and tension headaches significantly by relaxing muscle spasms and
              trigger points.
            </li>
            <li>
              In a comfort role, massage is done to ease the pressure brought on
              during a migraine or tension related headache. By focusing on the
              neck, shoulders, and head, massage can decrease the pain and
              discomfort brought on by migraine or tension headaches.
            </li>
          </ul>
          <p>
            Sports massage therapy is geared toward athletes of every kind, from
            world-class professionals to weekend joggers. Taking care of Your body
            should be at the top of Your priorities. By adding therapeutic massage
            to Your routine now, You’ll feel, look and simply be healthier far into
            the future.
          </p>`
        ])

    await db.query(`INSERT INTO "BodyTreatment" (name, image_link, short_description, description) VALUES ($1, $2, $3, $4)`,
        ['Lava Stone Massage',
        'lava-stone-massage.jpeg',
        'Warmed, smooth lava stones are used to massage the body delivering deep relief to tired muscles.',
        `<p>
            Lava stone massage is a warmth-procedure that can be acting miracles on
            relaxing and lengthening/ toning the subcutaneous tissue collagen fibers
            usually responsible for visible aging of face and body skin and muscles.
          </p>
          <p>
            Lava stones (usually basalt) – which themselves have been born in nature
            when drops of melted volcanic mineral material has cooled down in water
            environment &amp; thus able to accumulate heat into their structure by
            their very nature – will be re-heated for the massage to a temperature
            of 50–60°C in hot water bowl.
          </p>
          <p>
            The procedure starts with easy hand massage using essential aromatic
            oils. Then the biggest hot stones are placed on the vertebral column
            from occiput till sacrum and covered up with thick towels to keep the
            warmth in &amp; around body of client possibly longer. This will be
            followed by superficial gliding massage with hot middle-sized smooth
            lava stones along legs, arms and muscular sides of the back first and
            later also on front side, while the bigger re-heated stones will be
            arranged on the belly. Smaller hot stones will be placed on the palms,
            soles and between the toes, and later also used to glide over the neck,
            chin, cheeks &amp; forehead.
          </p>
          <p>
            Lava stone massage is pleasantly relaxing, agitates the blood
            circulation, lymphatic and immune system, heats and relaxes the muscles,
            boosts the metabolism and the organism is also strongly detoxified.
            According to Eastern medicine concepts the accumulated heat, together
            with the energetic vibrations of the lava stones, releases the blocked
            energy in the energy lines (meridians), resulting in the balancing and
            harmonization of energy in the whole body.
          </p>
          <p>
            For persons who do believe into healing power of crystals also the
            chakra-appropriate gems can be used:
          </p>
          <ul>
            <li>amethyst – crown chakra</li>
            <li>sodalite – third eye</li>
            <li>turquoise&nbsp; – throat chakra</li>
            <li>pink quartz – heart chakra</li>
            <li>tiger’s eye – solar plexus</li>
            <li>jasper – lower abdomen</li>
            <li>heliotrope – root chakra</li>
          </ul>
          <p>
            Lava stone massage is highly effective against pain (back, neck, head,
            joints, muscles) and cramps. It relaxes all stress, physical and
            mental.<br />
            The warm body perfectly absorbs the essential nutrient oil with deep
            action. The skin remains supple, hydrated, velvety and tender.
          </p>
          <p>
            Thanks to rapid detoxification, it has a slimming effect and
            significantly reduces cellulite.
          </p>
          <p>
            The massage is not suitable for pregnant women, people with varicose
            veins, skin diseases, cancer, fever and infectious diseases and people
            that are hypersensitive to heat.
          </p>`
        ])

    await db.query(`INSERT INTO "BodyTreatment" (name, image_link, short_description, description) VALUES ($1, $2, $3, $4)`,
        ['Pregnancy Massage',
        'pregnancy-massage.jpeg',
        'Designed to relieve fatigue, pain and tension during pregnancy. Creates a nurturing environment for both mother and baby. Pregnancy cushions are provided for your comfort.',
        `<p>
            Your attitude towards Yourself as a woman will be changing as soon as
            You’ve learned about being pregnant. Habituating to the thought of a new
            life in Your body requires serious psychological and emotional
            adjustment.
          </p>
          <p>
            Changes in female body during pregnancy may cause ailments: back pain is
            one of the more common side effects of pregnancy and even without pain
            You may sense heaviness in lower back, hips and legs, tension in neck
            and shoulder girdle, cramps in legs, insomnia, oedema, numbness in
            hands. All these ailments can be lessened with massage. Having massage
            once or twice a week is sufficient and by healthy pregnancy it can
            continue till delivery. Advisable duration of procedure is 45min.
          </p>
          <p>
            Prenatal massage is oriented to prevent and relieve the discomforts
            accompanying the carrying of a child. Alongside with the relaxing
            breathing, Thai massage can help to prepare the female body for the
            labor. It calms central nervous system by improving the release of
            well-being hormones such as serotonin and endorphins that are able to
            pass through placenta and also calmingly influence the fetus. Those
            mothers-to-be whose healthy course of pregnancy has allowed to enjoy
            massage till the delivery are also blessed with easier flow of labor as
            the muscles of their pelvis bottom can relax better and be stretched
            more without complications.<br />
            Calm, breath-following rhythm, gentle pressure and mild stretching
            techniques of Thai traditional massage nuad bo rarn soothe the body and
            soul, create balance, reduce anxiety and redirect the thoughts to the
            positive waves.
          </p>
          <p>
            The massage is usually given fully clothed, ideally wearing loose
            fitting clothing, on large mattress on the floor in the side-lying
            position to ensure the safety and well-being of both the mother and the
            baby. The massage can help to make pregnancy and delivery a much
            smoother and more pain free experience.
          </p>`
        ])

    await db.query(`INSERT INTO "BodyTreatment" (name, image_link, short_description, description) VALUES ($1, $2, $3, $4)`,
        ['Dual Massage',
        'dual-massage.jpeg',
        'Share your experience in the privacy of our couple’s suite. Enjoyable for couples, mothers and daughters and best friends. Makes the perfect gift for Valentine’s Day and anniversaries.',
        `<p>
            Duo massage is a couples massage which allows partners to experience
            relaxing massage (classical swedish massage) together in the same room
            as one therapist working on each person. The couple can be a husband and
            wife, boyfriend and girlfriend, mom and daughter or best friends etc.<br />
            In addition to the classical massage, a warm paraffin mask is applied on
            hands. Paraffin Hand Treatment soothes and relaxes tired, achy and rough
            hands. A hydrating cream will be massaged into your hands, after which
            paraffine strips will be layered on top. When the paraffin is cooled and
            removed the end result is softer and smoother looking skin. Duo massage
            is a perfect present for Valentine’s Day, International Women’s Day,
            Mother’s Day etc.
          </p>`
        ])

    await db.query(`DROP TABLE IF EXISTS "Studio"`)
    await db.query(
      `CREATE TABLE "Studio" (
        "id" SERIAL PRIMARY KEY,
        "city" VARCHAR(200) NOT NULL,
        "address" VARCHAR(400) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`
      )
    
    await db.query(`INSERT INTO "Studio" (city, address) VALUES ($1, $2)`, 
        ['New York', '153 W 27th St'])
    await db.query(`INSERT INTO "Studio" (city, address) VALUES ($1, $2)`, 
        ['New York', '22 W 48th St Suite 704'])
    await db.query(`INSERT INTO "Studio" (city, address) VALUES ($1, $2)`, 
        ['Seattle', '1818 Westlake Ave N Ste 419'])
    await db.query(`INSERT INTO "Studio" (city, address) VALUES ($1, $2)`, 
        ['Seattle', '2818 E Madison St'])
    await db.query(`INSERT INTO "Studio" (city, address) VALUES ($1, $2)`, 
        ['Seattle', '10021 Holman Road NW'])
    await db.query(`INSERT INTO "Studio" (city, address) VALUES ($1, $2)`, 
        ['Los Angeles', '998 S Robertson Blvd'])
    await db.query(`INSERT INTO "Studio" (city, address) VALUES ($1, $2)`, 
        ['Los Angeles', '3959 Wilshire Blvd b27'])
    await db.query(`INSERT INTO "Studio" (city, address) VALUES ($1, $2)`, 
        ['Los Angeles', '1251 South La Brea Ave'])

    await db.query(
      `CREATE TABLE "Studio.BodyTreatment" (
        "id" SERIAL PRIMARY KEY,
        "studio_id" INT,
        "body_treatment_id" INT,
        "duration" INT,
        "price" VARCHAR(20),
      "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_studio 
          FOREIGN KEY(studio_id) 
            REFERENCES "Studio"(id) 
            ON DELETE CASCADE,
        CONSTRAINT fk_body_treatment 
          FOREIGN KEY(body_treatment_id) 
            REFERENCES "BodyTreatment"(id) 
            ON DELETE CASCADE)`
      )

    for (let i = 1; i <= 8; i += 1) {
      for (let j = 1; j <= 5; j += 1) {
        if (getRndInteger(1, 10) < 10) {
          await db.query(`INSERT INTO "Studio.BodyTreatment" (studio_id, body_treatment_id, duration, price) VALUES ($1, $2, $3, $4)`,
          [i, j, 30, `${getRndInteger(25, 30)}.0`])
        }
        
        if (getRndInteger(1, 10) < 7) {
          await db.query(`INSERT INTO "Studio.BodyTreatment" (studio_id, body_treatment_id, duration, price) VALUES ($1, $2, $3, $4)`,
          [i, j, 45, `${getRndInteger(30, 40)}.0`])
        }
        
        if (getRndInteger(1, 10) < 9) {
          await db.query(`INSERT INTO "Studio.BodyTreatment" (studio_id, body_treatment_id, duration, price) VALUES ($1, $2, $3, $4)`,
          [i, j, 60, `${getRndInteger(40, 50)}.0`])
        }
        
        if (getRndInteger(1, 10) < 7) {
          await db.query(`INSERT INTO "Studio.BodyTreatment" (studio_id, body_treatment_id, duration, price) VALUES ($1, $2, $3, $4)`,
          [i, j, 90, `${getRndInteger(50, 60)}.0`])
        }
      }
    }

    await db.query(`DROP TABLE IF EXISTS "Booking"`)
    await db.query(
      `CREATE TABLE "Booking" (
        "id" SERIAL PRIMARY KEY,
        "user_id" INT NOT NULL,
        "studio_body_treatment_id" INT NOT NULL,
        "date" VARCHAR(10) NOT NULL,
        "start_time" VARCHAR(10) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`
      )

    res.send('Database seeded!')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error!')
  }
})

module.exports = router
