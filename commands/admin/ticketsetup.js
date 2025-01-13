const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChannelType, ButtonBuilder } = require('discord.js');
const config = require("../../config")

  class commandticketsetup {
    constructor() {
      this.name = 'ticket-setup';
      this.description = '🚀 Configure le système de tickets';
    }

    async execute(interaction, client) {
    const errorperm = new EmbedBuilder()
      .setTitle("**⚠️ Attention**")
      .setDescription("Vous n'avez pas la permission d'exécuter cette commande.")
      .setColor("#ff4000")

      if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return interaction.reply({ embeds: [errorperm] });
    }

    const openTicketEmbed = new EmbedBuilder()
      .setTitle(config.open_title)
      .setDescription(config.open_description)
      .setColor(config.open_color)
      .setFooter({ text: config.open_footer })
      .setThumbnail(config.open_thumbnail);

    const openTicketRow = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('openTicket')
          .setPlaceholder('Choisissez la raison de l\'ouverture de votre ticket')
          .addOptions([
            {
              label: 'Catégorie 1',
              emoji: '🎟',
              description: 'Description de la catégorie 1',
              value: 'category1'
            },
            {
              label: 'Catégorie 2',
              emoji: '🎟',
              description: 'Description de la catégorie 2',
              value: 'category2'
            },
            {
              label: 'Catégorie 3',
              emoji: '🎟',
              value: 'category3',
              description: 'Description de la catégorie 3'
            },
            {
              label: 'Catégorie 4',
              emoji: '🎟',
              description: 'Description de la catégorie 4',
              value: 'category4'
            }
          ])
      );

    const ticketMessage = await interaction.channel.send({ embeds: [openTicketEmbed], components: [openTicketRow] });
    await interaction.reply({ content: "**✅ Configuration du système de ticket réussie !**", ephemeral: true });

    client.on('interactionCreate', async (interaction) => {
      if (interaction.isMessageComponent() && interaction.customId === 'openTicket') {
        const staffRole = interaction.guild.roles.cache.get(config.staff_role);
        const everyoneRole = interaction.guild.roles.everyone;
        const ticketChannel = await interaction.guild.channels.create({
          name: `ticket-${interaction.user.username}`,
          type: ChannelType.GuildText,
          parent: config.ticket_category,
          permissionOverwrites: [
            {
              id: interaction.user.id,
              allow: ['101376'],
            },
            {
              id: staffRole.id,
              allow: ['101376'],
            },
            {
              id: everyoneRole.id,
              deny: ['114349209288703'],
            },
          ],
        });
        await interaction.reply({ content: `**✅ Votre ticket (${ticketChannel}) a bien été ouvert !**`, ephemeral: true });


        const closeTicketConfirmationRow = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('closeTicketConfirmation')
              .setLabel('Confirmer la fermeture')
              .setEmoji('✅')
              .setStyle('Success'),
            // new ButtonBuilder()
            //   .setCustomId('cancelTicketClose')
            //   .setLabel('Annuler la fermeture')
            //   .setEmoji('❌')
            //   .setStyle('Danger')
          );

          const closeTicketRow = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('closeTicket')
              .setLabel('Fermer le ticket')
              .setEmoji('🗑️')
              .setStyle('Danger'),
            new ButtonBuilder()
              .setCustomId('claim')
              .setLabel('Réclamer')
              .setEmoji('✅')
              .setStyle('Success')
          );

        const welcomeEmbed = new EmbedBuilder()

        const handleCategorySelection = async (menuInteraction) => {
            const selectedCategory = menuInteraction.values[0];

              if (selectedCategory === 'category1') {
                welcomeEmbed.setTitle(config.title_1)
                welcomeEmbed.setColor(config.color_1)
                welcomeEmbed.setDescription(config.description_1)
              } else if (selectedCategory === 'category2') {
                welcomeEmbed.setTitle(config.title_2)
                welcomeEmbed.setColor(config.color_2)
                welcomeEmbed.setDescription(config.description_2)
              } else if (selectedCategory === 'category3') {
                welcomeEmbed.setTitle(config.title_3)
                welcomeEmbed.setColor(config.color_3)
                welcomeEmbed.setDescription(config.description_3)
              } else if (selectedCategory === 'category4') {
                welcomeEmbed.setTitle(config.title_4)
                welcomeEmbed.setColor(config.color_4)
                welcomeEmbed.setDescription(config.description_4)
              }
            }
        await handleCategorySelection(interaction);

        const welcomeMessage = await ticketChannel.send({ embeds: [welcomeEmbed], components: [closeTicketRow], content: `||${interaction.user} | <@&${config.staff_role}>||` });

        const collector = welcomeMessage.createMessageComponentCollector();

        function replacePlaceholders(text, inter) {
          return text.replace('{inter.user}', inter.member.user.toString());
        }

        try {
          collector.on('collect', async (interaction) => {
            if (interaction.isButton() && interaction.customId === "claim") {
              const claimedEmbed = new EmbedBuilder()
                .setTitle("**✅ Ticket Réclamé**")
                .setDescription(replacePlaceholders("Votre ticket sera traité par {inter.user} !", interaction))
                .setColor("Green")
                .setFooter({ text: "🚀 Powered by github.com/noahprm" });
                if (!interaction.member.roles.cache.has(config.staff_role)) {
                  return await interaction.reply({ content: "**⚠️ Vous devez être un membre de l'équipe des STAFF pour intéragir avec ce bouton.**", ephemeral: true })
                }
              await interaction.reply({ embeds: [claimedEmbed] });
            } else if (interaction.isButton() && interaction.customId === "closeTicket") {
              const confirmationEmbed = new EmbedBuilder()
                .setTitle("**⚠️ Confirmation de Cloture**")
                .setDescription("Souhaitez-vous vraiment mettre fin à ce ticket ? Cet acte est irréversible.")
                .setFooter({ text: config.embed_footer })
                .setColor("#ff4000")
              const closeTicketConfirmation = await interaction.reply({ embeds: [confirmationEmbed], components: [closeTicketConfirmationRow] });
              const closeTicketCollector = closeTicketConfirmation.createMessageComponentCollector();
              closeTicketCollector.on('collect', async (interaction) => {
                if (interaction.isButton() && interaction.customId === "cancelTicketClose") {
                  return await closeTicketConfirmation.delete();
                } else if (interaction.isButton() && interaction.customId === "closeTicketConfirmation") {
                  const closeTicketEmbed = new EmbedBuilder()
                      .setTitle("**✅ Ticket Fermé**")
                      .setDescription("Le ticket a bien été fermé. Il sera supprimé dans 10 secondes.")
                      .setColor("Green")
                      .setFooter({ text: config.embed_footer });

                  await closeTicketConfirmation.edit({ embeds: [closeTicketEmbed], components: [] });

                  setTimeout(() => {
                    interaction.channel.delete().catch(err => console.error("Erreur lors de la suppression du channel :", err));
                  }, 10000);
                }
              });
            }
          });
        } catch (e) {
          console.error(e);
        }
    }
    }
    );
  }
}

module.exports = commandticketsetup;