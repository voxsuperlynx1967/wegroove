"""create users table

Revision ID: fe8bcb4e7264
Revises: 
Create Date: 2020-10-07 09:45:07.434258

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fe8bcb4e7264'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('musician',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstName', sa.String(length=40), nullable=False),
    sa.Column('lastName', sa.String(length=40), nullable=True),
    sa.Column('location', sa.String(length=500), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('bio', sa.String(length=2000), nullable=True),
    sa.Column('hashed_password', sa.Binary(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('musician')
    # ### end Alembic commands ###