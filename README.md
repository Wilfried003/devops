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
login: k8s-master
mdp: master

ens33: 192.168.135.128

connection ssh: ssh username@addressssh (k8s-master@192.168.135.128)

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
sudo kubectl get nodes
""""

8. Installation de k3s
sudo cat /var/lib/rancher/k3s/server/node-token
K1011bde42cdb00b742ff92517d8ae81f1c30ae177ca14004f76ea73dbd277fff2a::server:a3cbe39e119c4e0fa07b78b7cb473200


9. clone des vm
A ce stade, le clone permet d'avoir les deux autres machines virtuelles avec docker, k3s  et ubuntu deja installé

10. Changer le nom des vm clonée
sudo hostnamectl set-hostname k8s-worker-1

11. changer l'ip 
# On efface l'identifiant copié du Master
sudo rm /etc/machine-id
sudo dbus-uuidgen --ensure=/etc/machine-id

# On demande au réseau de nous donner une nouvelle IP
sudo netplan apply

ip addr show ens33


connection ssh: ssh username@addressssh (k8s-master@192.168.135.128)

ssh k8s-master@k8s-worker-1

    
# Nouveau concept
RST : Intel Rapid Storage Technology

192.168.135.128/24