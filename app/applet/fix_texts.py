import re

with open('src/constants/productTexts.ts', 'rb') as f:
    content = f.read()

# Let's search for the line starting with b'* **D\xc3\xbc\xc5\x9f\xc3\xbck Piksel Resimler:**'
# and replace it.
target_pattern = b'\* \*\*D\xc3\xbc\xc5\x9f\xc3\xbck Piksel Resimler:\*\*.*## Masa Sunumlar\xc4\xb1nda Ka\xc4\x9f\xc4\xb1t Amerikan Servis \xc3\x87\xc3\xb6z\xc3\xbcmleri'

replacement = b'* **D\xc3\xbc\xc5\x9f\xc3\xbck Piksel Resimler:** Dev boyutlu bir afi\xc5\x9fe internetten indirilmi\xc5\x9f kalitesiz pikselli bir g\xc3\xb6rsel koyarak uzaktan bak\xc4\xb1ld\xc4\xb1\xc4\x9f\xc4\xb1nda k\xc4\xb1r\xc4\xb1k pikseller olu\xc5\x9fmas\xc4\xb1 (Afi\xc5\x9fteki g\xc3\xb6rseller en az 300 DPI ve y\xc3\xbcksek \xc3\xa7\xc3\xb6z\xc3\xbcn\xc3\xbcrl\xc3\xbckl\xc3\xbc vekt\xc3\xb6r formatta olmal\xc4\xb1d\xc4\xb1r).`,\n\n  "amerikan_servis": `## Masa Sunumlar\xc4\xb1nda Ka\xc4\x9f\xc4\xb1t Amerikan Servis \xc3\x87\xc3\xb6z\xc3\xbcmleri'

if re.search(target_pattern, content):
    content = re.sub(target_pattern, replacement, content)
    with open('src/constants/productTexts.ts', 'wb') as f:
        f.write(content)
    print("SUCCESS")
else:
    # Let's check with a broader search
    print("NOT FOUND")
