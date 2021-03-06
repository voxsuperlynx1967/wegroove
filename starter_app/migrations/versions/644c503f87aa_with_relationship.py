"""with relationship

Revision ID: 644c503f87aa
Revises: 
Create Date: 2020-10-29 12:13:54.753615

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '644c503f87aa'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('geartypes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=500), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('musicians',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstName', sa.String(length=40), nullable=False),
    sa.Column('lastName', sa.String(length=40), nullable=True),
    sa.Column('longitude', sa.Float(), nullable=False),
    sa.Column('latitude', sa.Float(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('bio', sa.String(length=2000), nullable=True),
    sa.Column('mediaLink', sa.String(length=2000), nullable=True),
    sa.Column('hashed_password', sa.Binary(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('type', sa.String(length=100), nullable=False),
    sa.Column('is_required', sa.Binary(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('follows',
    sa.Column('musicianId', sa.Integer(), nullable=False),
    sa.Column('followerId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['followerId'], ['musicians.id'], ),
    sa.ForeignKeyConstraint(['musicianId'], ['musicians.id'], ),
    sa.PrimaryKeyConstraint('musicianId', 'followerId')
    )
    op.create_table('gear',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=500), nullable=True),
    sa.Column('gearTypeId', sa.Integer(), nullable=False),
    sa.Column('musicianId', sa.Integer(), nullable=False),
    sa.Column('mediaLink', sa.String(length=2000), nullable=True),
    sa.ForeignKeyConstraint(['gearTypeId'], ['geartypes.id'], ),
    sa.ForeignKeyConstraint(['musicianId'], ['musicians.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('geartypetags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('gearTypeId', sa.Integer(), nullable=False),
    sa.Column('tagId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['gearTypeId'], ['geartypes.id'], ),
    sa.ForeignKeyConstraint(['tagId'], ['tags.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('musicianId', sa.Integer(), nullable=False),
    sa.Column('postType', sa.String(length=200), nullable=False),
    sa.Column('mediaLink', sa.String(length=2000), nullable=True),
    sa.Column('objectId', sa.Integer(), nullable=True),
    sa.Column('caption', sa.String(length=2000), nullable=True),
    sa.Column('likeCount', sa.Integer(), nullable=True),
    sa.Column('commentCount', sa.Integer(), nullable=True),
    sa.Column('datePosted', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['musicianId'], ['musicians.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('postId', sa.Integer(), nullable=False),
    sa.Column('musicianId', sa.Integer(), nullable=False),
    sa.Column('dateCommented', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['musicianId'], ['musicians.id'], ),
    sa.ForeignKeyConstraint(['postId'], ['posts.id'], ),
    sa.PrimaryKeyConstraint('postId', 'musicianId')
    )
    op.create_table('gearattributes',
    sa.Column('gearId', sa.Integer(), nullable=False),
    sa.Column('tag', sa.String(length=500), nullable=False),
    sa.Column('value', sa.String(length=200), nullable=False),
    sa.ForeignKeyConstraint(['gearId'], ['gear.id'], ),
    sa.PrimaryKeyConstraint('gearId', 'tag')
    )
    op.create_table('likes',
    sa.Column('postId', sa.Integer(), nullable=False),
    sa.Column('musicianId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['musicianId'], ['musicians.id'], ),
    sa.ForeignKeyConstraint(['postId'], ['posts.id'], ),
    sa.PrimaryKeyConstraint('postId', 'musicianId')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('likes')
    op.drop_table('gearattributes')
    op.drop_table('comments')
    op.drop_table('posts')
    op.drop_table('geartypetags')
    op.drop_table('gear')
    op.drop_table('follows')
    op.drop_table('tags')
    op.drop_table('musicians')
    op.drop_table('geartypes')
    # ### end Alembic commands ###
