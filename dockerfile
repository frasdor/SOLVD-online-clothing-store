# 1. Wybieramy oficjalny obraz Node
FROM node:20

# 2. Ustawiamy katalog roboczy w kontenerze
WORKDIR /usr/src/app

# 3. Kopiujemy package.json i package-lock.json
COPY package*.json ./

# 4. Instalujemy zależności
RUN npm install

# 5. Kopiujemy resztę kodu
COPY . .

# 6. Eksponujemy port, na którym działa backend
EXPOSE 3000

# 7. Domyślna komenda uruchamiająca backend
CMD ["npm", "start"]
