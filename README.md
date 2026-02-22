# devops

1. Installer ubuntu
Pour ce Tp il serait intéressant d'installer un OS légé comme ubuntu contraiment à windows

2. mettre à jour le system
sudo apt update && sudo apt upgrade -y

3. Installer les outils CI/CD
Comme outils CI/CD, nous avons :
- git
- vscode
- curl
- freelens

Tout ca par la commande sudo apt install <nom>


4. Installer VMware workstation player
Depuis le rachat de VMware par braodcom, il est gratuit.
S'inscrit sur le site et le telecharger par ce lien : https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion . 
Donner le droit d'execution au fichier et l'installer ./FileName

5. Telecharger la version ISO ubuntu server 

6. Installer ubuntu server pour le node master(desactié l'option 3S dans display)
- activé le openssh

login: k8s-master
mdp: master

ip address show
eth0 ou ens33 : 192.168.135.131

commande pour s'y connecter en ssh: 
ssh username@address : ssh k8s-master@192.168.135.131

7. installation de docker

"""
sudo swapoff -a

# Ajoute la clé GPG officielle de Docker
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg -y
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Ajoute le dépôt Docker à tes sources
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Installe Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

sudo usermod -aG docker $USER
""""

8. clone des vm
A ce stade, le clone permet d'avoir les deux autres machines virtuelles avec docker, k3s  et ubuntu deja installé

9. Installation de k3s sur master

curl -sfL https://get.k3s.io | sh -

recuperer l'address ip et le token k3s

sudo cat /var/lib/rancher/k3s/server/node-token
K10e5b6dc28db4e8ad3e42a6d7bf7679e1b7f949aa2e1ec87b89f77b578f55eeb6b::server:b6034497eb12709e7e62c9142a002e3d

Ouvrir le parefeu
sudo ufw allow 6443/tcp
sudo ufw allow 10250/tcp

10. Changer le nom et l'ip des vm clonées

sudo hostnamectl set-hostname k8s-worker-1

Générer une nouvelle identité (Machine ID) :
sudo rm /etc/machine-id
sudo dbus-uuidgen --ensure=/etc/machine-id
sudo reboot

11. Installer k3s sur le worker1 et le faire joindre au cluster en tant que worker

Télécharger le script :
wget https://get.k3s.io -O install.sh
chmod +x install.sh

Lancer la jointure (avec tes infos) :
sudo K3S_URL=https://<IP_DU_MASTER>:6443 K3S_TOKEN=<TON_TOKEN> ./install.sh
sudo K3S_URL=https://192.168.135.131:6443 K3S_TOKEN=K10e5b6dc28db4e8ad3e42a6d7bf7679e1b7f949aa2e1ec87b89f77b578f55eeb6b::server:b6034497eb12709e7e62c9142a002e3d ./install.sh

Vérifier que le service tourne :
sudo systemctl status k3s-agent

12. cloner le worker1 en worker 2 et changer le nom et l'ip
sudo hostnamectl set-hostname k8s-worker-2

#Générer une nouvelle identité (Machine ID) :
sudo rm /etc/machine-id
sudo dbus-uuidgen --ensure=/etc/machine-id
sudo reboot

attention au ip en clonant


login: k8s-master
mdp: master
ens33: 192.168.135.132

login: k8s-worker-1
mdp: master
ens33: 192.168.135.132

login: k8s-worker-2
mdp: master
ens33: 192.168.135.128

# Nouveau concept
RST : Intel Rapid Storage Technology

192.168.135.128/24





