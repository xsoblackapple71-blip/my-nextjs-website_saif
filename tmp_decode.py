from pathlib import Path
s = "αªÅαªòαª£αª¿ αª½αºçαª╕αª¼αºüαªò αªçαª₧αºìαª£αª┐αª¿αª┐αª»αª╝αª╛αª░αºçαª░ αª░αª┐αª£αª┐αªëαª«αª┐ αªòαºçαª«αª¿ αª╣αª»αª╝?"
print('orig:', s)
for enc in ['latin-1', 'cp1252', 'utf-8']:
    try:
        b = s.encode(enc)
        print('\nencode', enc, b)
        for dec in ['utf-8', 'latin-1', 'cp1252', 'utf-16', 'utf-16le', 'utf-16be']:
            try:
                print(' decode', dec, b.decode(dec))
            except Exception as e:
                print(' fail', dec, repr(e))
    except Exception as e:
        print('cannot encode', enc, repr(e))
# try the reverse: encode from utf-8 bytes as latin-1 -> decode as utf-8
b = s.encode('utf-8')
print('\nutf8 bytes:', b)
try:
    print('utf8->latin-1->utf8', b.decode('latin-1').encode('latin-1').decode('utf-8'))
except Exception as e:
    print('fail weird decode', e)
