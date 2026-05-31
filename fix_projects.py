from pathlib import Path

path = Path('src/db/projects.ts')
text = path.read_text(encoding='utf-8')
replacements = {
    # Targeted cleanup for specific corrupted titles / descriptions
    """    video_title: "αªÅαªòαª£αª¿ αª½αºçαª╕αª¼αºüαªò αªçαª₧αºìαª£αª┐αª¿αª┐αª»αª╝αª╛αª░αºçαª░ αª░αª┐αª£αª┐αªëαª«αª┐ αªòαºçαª«αª¿ αª╣αª»αª╝?""":
        "    video_title: \"How to Build Your Perfect Resume?\",",
    """      \"The Real Reason You CanΓÇÖt Change (And How to Fix It in 21 Days) | Angela Orr\",""":
        "      \"The Real Reason You Can't Change (And How to Fix It in 21 Days) | Angela Orr\",",
    """    video_description: `You've tried every habit hack, diet, and self-help bookΓÇöbut real change still feels impossible. Why? Because you're trying to change your behavior without changing your identity.`,""":
        "    video_description: `You've tried every habit hack, diet, and self-help book—but real change still feels impossible. Why? Because you're trying to change your behavior without changing your identity.`,",
    """    video_title: \"EduNurture360 αªòαª┐? | Edu Bridge Academy\",""":
        "    video_title: \"EduNurture360 Promotion | Edu Bridge Academy\",",
    """    video_description: \"αª╢αºüαª░αºü αª╣αª»αª╝αºç αªùαºçαª¢αºç EduNurture360 αªÅαª░ αº¿αºªαº¿αº¬ αª╕αª╛αª▓αºçαª░ αª¼αºìαª»αª╛αªÜ!\",""":
        "    video_description: \"Experience EduNurture360 with Edu Bridge Academy: a modern learning platform designed to make education engaging, accessible, and skill-focused.\",",
    """      \"BangladeshΓÇÖs First Flexible Discount for EdTech ΓÇô Learn Without Limits!\",""":
        "      \"Bangladesh's First Flexible Discount for EdTech - Learn Without Limits!\",",
    """    video_description: `Bangladesh's First Flexible Discount for EdTech ΓÇô Learn Without Limits!`,""":
        "    video_description: `Bangladesh's First Flexible Discount for EdTech - Learn Without Limits!`,",
    """    video_title: \"αª¬αºìαª░αºïαªùαºìαª░αª╛αª«αª┐αªé αªÅαª░ αª½αª╛αª¿αºìαªíαª╛αª«αºçαª¿αºìαªƒαª╛αª▓ αª╢αºçαªûαª╛ αªòαºçαª¿ αª£αª░αºüαª░αºÇ?\",""":
        "    video_title: \"Programming Basics Made Simple | Stack Learner\",",
    """    video_description: `αª½αª╛αª¿αºìαªíαª╛αª«αºçαª¿αºìαªƒαª╛αª▓ αª¿αª╛ αª╢αª┐αªûαºç αªòαª╛αª£ αª╢αºçαªûαª╛ αª╢αºüαª░αºü αªòαª░αª▓αºç αªòαºçαª¿ αª╕αª«αª╕αºìαª»αª╛ αª╣αºƒΓÇöαªÅαªç αª¡αª┐αªíαª┐αªôαªñαºç αª£αª╛αª¿αºüαª¿αÑñ`,""":
        "    video_description: `A beginner-friendly explainer video that breaks programming basics into simple, easy-to-follow lessons for new learners.`,",
    """    video_description: `αªÅαªòαªƒαª┐ αª¡αºüαª▓ αªçαª«αºçαªçαª▓ αªòαª¿αª½αª┐αªùαª╛αª░αºçαª╢αª¿αºçαª░ αªòαª╛αª░αªúαºç αª¿αª╖αºìαªƒ αª╣αªñαºç αª¬αª╛αª░αºç αªåαª¬αª¿αª╛αª░ αª╕αª¼αªÜαºçαª»αª╝αºç valuable αªòαºìαª▓αª╛αª»αª╝αºçαª¿αºìαªƒ αªô αª¼αºìαª»αª¼αª╕αª╛αª░ αª╕αºüαª¿αª╛αª«αÑñ`,""":
        "    video_description: `A concise explainer of business email services, showing how companies can set up professional email systems for reliable communication and productivity.`,",
    """    video_description: `αªôαª»αª╝αºçαª¼αª╕αª╛αªçαªƒ αª╣αªñαºç αª╣αºƒ αª½αª╛αª╕αºìαªƒ, αª╕αºìαª«αª╛αª░αºìαªƒ, αªô αªçαª¿αªƒαºüαªçαªƒαª┐αª¡ ΓÇö αª»αª╛αªñαºç αª¼αª╛αº£αºç αª¼αºìαª»αª¼αª╕αª╛αª░ conversion.`,""":
        "    video_description: `A web and e-commerce development walkthrough that highlights modern design, responsive layouts, and conversion-focused site features for online businesses.`,",
    """    video_description: `αª¡αª┐αª£αª┐αªƒαª░ αªåαª╕αª¢αºç, αªòαª┐αª¿αºìαªñαºü αªòαª╛αª╕αºìαªƒαª«αª╛αª░ αª╣αªÜαºìαª¢αºç αª¿αª╛? αª╕αª«αª╕αºìαª»αª╛ αª¬αºìαª░αºïαªíαª╛αªòαºìαªƒαºç αª¿αª╛, αª«αª╛αª░αºìαªòαºçαªƒαª┐αªé αª╕αª┐αª╕αºìαªƒαºçαª«αºçαÑñ`,""":
        "    video_description: `A digital marketing explainer showcasing how to create growth-driven campaigns, optimize ads, and attract the right customers for business success.`,",
    """    video_description: `αª£αª╛αª╕αºìαªƒ αªÅαªòαªƒαª╛ wrong αªòαºìαª▓αª┐αªò, αªàαªÑαª¼αª╛ unknown  αª▓αª┐αªéαªòΓÇª αªåαª░ αª«αºüαª╣αºéαª░αºìαªñαºçαªç αªåαª¬αª¿αª╛αª░ αª¼αª┐αª£αª¿αºçαª╕ αª╣αªñαºç αª¬αª╛αª░αºç αª╕αª╛αªçαª¼αª╛αª░ αª╣αºìαª»αª╛αªòαºçαª░ αªÅαª░  αª╢αª┐αªòαª╛αª░αÑñ`,""":
        "    video_description: `A cyber security awareness video that explains protection strategies, common threats, and essential best practices to keep businesses safe online.`,",
    """    video_title: \"Qurbani Song 2023 | αªòαºïαª░αª¼αª╛αª¿αª┐ αªêαªªαºçαª░ αªùαª╛αª¿ Qurbani Song\",""":
        "    video_title: \"Qurbani Song 2023 | Eid-ul-Adha Special Qurbani Song\",",
    """    video_title: \"Toke vebe αªñαºïαªòαºç αª¡αºçαª¼αºçαÑñ Jaane Kyun Bangla version\",""":
        "    video_title: \"Toke Vebe Jaane Kyun Bangla Version\",",
    """    video_title: \"Shorbonash 2.0 αª╕αª░αºìαª¼αª¿αª╛αª╢ 2.0 | Bangla Rap 2024\",""":
        "    video_title: \"Shorbonash 2.0 | Bangla Rap 2024\",",
    """    video_title: \"αª«αºçαª»αª╝αºç αªñαºüαªç αªÜαª┐αªƒ (Meye tui cheat) Rifat Official\",""":
        "    video_title: \"Meye Tui Cheat | Rifat Official\",",
    """    video_title: \"αªñαºïαª░ αª╣αª╛αªüαª╕αª┐ (Tor Haashi) Rifat OfficialαÑñ Sohan\",""":
        "    video_title: \"Tui Haashi (Tor Haashi) | Rifat Official - Sohan\",",
    """    video_title: \"αªñαºüαªç αª»αºç αªòαºïαªÑαª╛αª»αª╝ αÑñ Tui je kothay αÑñ New Music Video 2024\",""":
        "    video_title: \"Tui Je Kothay | New Music Video 2024\",",
    """    video_title: \"Haire Thanda αÑñ αª╣αª╛αªçαª░αºç αªáαª╛αª¿αºìαªíαª╛ αÑñ Winter Special Track\",""":
        "    video_title: \"Haire Thanda - Winter Special Track\",",
}

# Global cleanup for known mojibake patterns
global_replacements = {
    'ΓÇÖ': "'",
    'ΓÇô': ' - ',
    'ΓÇö': ' - ',
    'ΓÇª': '...',
    'αÑñ': ' - ',
    'αº╖': ' | ',
    'Γ¥ä∩╕Å': '',
    '≡ƒöì': '',
    '≡ƒöö': '',
    '≡ƒöÑ': '',
    '≡ƒñö': '',
    'αª¦': '',
}

for old, new in global_replacements.items():
    text = text.replace(old, new)

for old, new in replacements.items():
    if old in text:
        text = text.replace(old, new)
    else:
        print(f'WARNING: old string not found: {old[:80]}...')

path.write_text(text, encoding='utf-8')
print('Done, written file.')
