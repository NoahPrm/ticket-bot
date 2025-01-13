class config {
    constructor() {
        // Token du bot
        this.token = "TOKEN_BOT"

        // Configuration des tickets
        this.ticket_category = "ID_CATEGORIE_TICKETS"
        this.staff_role = "ID_ROLE_STAFF"

        // Configuration des embeds de base
        this.embed_color = "#808080"
        this.embed_footer = "👀 github.com/noahprm/ticket-bot"
        this.embed_thumbnail = "https://cdn.discordapp.com/avatars/1328471238296735825/2c448755b13c94965a03451e46ffb860.png?size=1024"

        // Configuration des titres des différents embeds de bienvenue pour les différentes catégories des tickets
        this.title_1 = "**Catégorie 1**" 
        this.title_2 = "**Catégorie 2**"
        this.title_3 = "**Catégorie 3**"
        this.title_4 = "**Catégorie 4**"

        // Configuration des description des différents embeds de bienvenue pour les différentes catégories des tickets
        this.description_1 = "<:fleche:1251602525682012230> Voici un example de description pour la catégorie n°1"
        this.description_2 = "<:fleche:1251602525682012230> Voici un example de description pour la catégorie n°2"
        this.description_3 = "<:fleche:1251602525682012230> Voici un example de description pour la catégorie n°3"
        this.description_4 = "<:fleche:1251602525682012230> Voici un example de description pour la catégorie n°4"

        // Configuration des footers des différents embeds de bienvenue pour les différentes catégories des tickets
        this.footer_1 = "👀 github.com/noahprm/ticket-bot"
        this.footer_2 = "👀 github.com/noahprm/ticket-bot"
        this.footer_3 = "👀 github.com/noahprm/ticket-bot"
        this.footer_4 = "👀 github.com/noahprm/ticket-bot"

        // Configuration des couleurs des différents embeds de bienvenue pour les différentes catégories des tickets
        this.color_1 = "#ff4000" 
        this.color_2 = "#ff4000" 
        this.color_3 = "#ff4000" 
        this.color_4 = "#ff4000" 

        // Configuration des différentes parties de l'embed de présentation (celui ou il y aura le select menu)
       this.open_title = "**<:staff:1327406634418442271> Ouvrir un ticket**"
       this.open_description = "<:check_mark:1241457145606836274> Système de tickets avancé développé par noahprm\n\n<:fleche:1251602525682012230> Voici un système de ticket avancé totalement configurable et personnalisable à l'aide de son fichier \"**config.js**\" où vous pourrez totalement modifier les embeds.\n\n<:fleche:1251602525682012230> Vous pouvez obtenir ce système de ticket en téléchargeant le code de ce repo github et en le configurant.\n\n<:fleche:1251602525682012230> Mes services pour des bots persos ne sont pas chères, alors pourquoi ne pas en profiter !"
       this.open_footer = "👀 github.com/noahprm/ticket-bot"
       this.open_color = "#ff4000"
       this.open_thumbnail = "https://cdn.discordapp.com/avatars/1328471238296735825/2c448755b13c94965a03451e46ffb860.png?size=1024"
    }

}

module.exports = new config()